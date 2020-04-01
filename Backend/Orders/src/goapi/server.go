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
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
) 
// MongoDB Config 
 
var mongodb_server = "10.0.2.154:27017"
var mongodb_database = "records"  
var mongodb_collection_orders = "orders" 
 

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
  
	mx.HandleFunc("/orders/{userid}", ordersAllDataHandler(formatter)).Methods("GET") //orders
	mx.HandleFunc("/postplaceorder", postplaceorderHandler(formatter)).Methods("POST") //orders

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

// API to view all Orders
func ordersAllDataHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		session, err := mgo.Dial(mongodb_server)
        if err != nil {
                panic(err)
		}	
		params := mux.Vars(req)
		 fmt.Printf("params[id]=%s \n", params["userid"])	
        defer session.Close()
        session.SetMode(mgo.Monotonic, true)
        c := session.DB(mongodb_database).C("orders")
        var result []bson.M
        err = c.Find(bson.M{"userid" : params["userid"]}).All(&result)
        if err != nil {
                log.Fatal(err)
        }
        fmt.Println("Order Data:", result)
		formatter.JSON(w, http.StatusOK, result)
	}
}

// API to post place order
func postplaceorderHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		session, err := mgo.Dial(mongodb_server)
        if err != nil {
                panic(err)
		}
		var result []bson.M
		_ = json.NewDecoder(req.Body).Decode(&result)

		// var result1 bson.M
		// json.Unmarshal(result, &result1)
        defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		fmt.Println(result)
        c := session.DB(mongodb_database).C("orders")
        for i := 0; i < len(result); i++ {
			fmt.Println("Cart Data:", result[i])
				err = c.Insert(result[i])
				if err != nil {
					formatter.JSON(w, http.StatusNotFound, "Create Payment Error")
					return
				}
		}
		formatter.JSON(w, http.StatusOK, result)
	}
}