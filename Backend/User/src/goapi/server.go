package main

import (
	"fmt"
	"log"
	"net/http"
	"encoding/json" 
	"github.com/codegangsta/negroni"
	"github.com/rs/cors"
	"github.com/gorilla/mux"
	"github.com/unrolled/render"
	"github.com/satori/go.uuid"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	 
) 
// MongoDB Config 
 
var mongodb_server = "52.9.187.122:27017"
var mongodb_database = "records" 
var mongodb_collection_user = "user" 
 

// NewServer configures and returns a Server.
func NewServer() *negroni.Negroni {
	formatter := render.New(render.Options{
		IndentJSON: true,
	})
	corsObj := cors.New(cors.Options{
        AllowedOrigins: []string{"*"},
        AllowedMethods: []string{"POST", "GET", "OPTIONS", "PUT", "DELETE"},
        AllowedHeaders: []string{"Accept", "content-type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization"},
	})
	
	n := negroni.Classic()
	mx := mux.NewRouter()
	initRoutes(mx, formatter)
	n.Use(corsObj)
	n.UseHandler(mx)
	return n
}


// API Routes
func initRoutes(mx *mux.Router, formatter *render.Render) { 

	mx.HandleFunc("/ping", pingHandler(formatter)).Methods("GET")
	mx.HandleFunc("/signup", signupHandler(formatter)).Methods("POST")  //user
	mx.HandleFunc("/login", loginHandler(formatter)).Methods("POST")  //user

}


// Helper Functions
func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
		panic(fmt.Sprintf("%s: %s", msg, err))
	}
}
func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
    (*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
    (*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

// API Ping Handler
func pingHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		formatter.JSON(w, http.StatusOK, struct{ Test string }{"API version 1.0 alive!"})
	}
}

// API Signup - Create user
func signupHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)

		var user User
		if err := json.NewDecoder(req.Body).Decode(&user); err != nil {
			fmt.Println(" Error: ", err)
			formatter.JSON(w, http.StatusBadRequest, "Invalid request payload")
			return
		}
		uuid := uuid.NewV4()
		user.User_id = uuid.String()
		fmt.Println("user.User_id: ", user.User_id)
		fmt.Println("req.Body: ", req.Body)
		fmt.Println("User signup Details:", user)

		c := session.DB(mongodb_database).C(mongodb_collection_user)
 
		var res Response 
		var result bson.M
		
		err = c.Find(bson.M{"email":user.Email}).One(&result)
		if err == nil {
			res.Status=-1
			res.Data="User with this email already exists."
			fmt.Println("User Details: ", err)
			formatter.JSON(w, http.StatusOK, res)
			return
		}

		if err := c.Insert(&user); err != nil {
			fmt.Println(" Error: ", err)
			formatter.JSON(w, http.StatusInternalServerError, err.Error())
			return
		}
		formatter.JSON(w, http.StatusCreated, user)
	}
}

// POST LOGIN /login/{email}

func loginHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		var user User
		if err := json.NewDecoder(req.Body).Decode(&user); err != nil {
			fmt.Println(" Error: ", err)
			formatter.JSON(w, http.StatusBadRequest, "Invalid request payload")
			return
		} 
	 
		var result bson.M 
		c := session.DB(mongodb_database).C(mongodb_collection_user)
		err = c.Find(bson.M{"email":user.Email}).One(&result)
		var res Response
		if err != nil {
			res.Status=-1
			res.Data="User not Found"
			fmt.Println("User Details: ", err)
			formatter.JSON(w, http.StatusOK, res)
			return
		} 
		if(result["password"] != user.Password){
			res.Status=-1
			res.Data="User not Found"
			fmt.Println("User Password Error: ", err)
			formatter.JSON(w, http.StatusOK, res)
			return
		}  
		fmt.Println("Successful Login")   
		formatter.JSON(w, http.StatusOK, result)
	}
}
