package main

import (
	"fmt"
	"log"
	"net/http"
	"encoding/json"
	// b64 "encoding/base64"
	"github.com/codegangsta/negroni"
	"github.com/rs/cors"
	"github.com/gorilla/mux"
	"github.com/unrolled/render" 
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"io/ioutil"
	"bytes" 
) 
// MongoDB Config  
var mongodb_server = "10.0.1.254:27017"
var mongodb_database = "records" 
var mongodb_collection_user = "user"
var mongodb_collection_cart = "cart"
var mongodb_collection_items = "items"
var mongodb_collection_orders = "orders"
var mongodb_collection_userid = "userid"
 

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
  
	//mx.HandleFunc("/addonecart/{itemid}", addonetoCartHandler(formatter)).Methods("PUT")  //cart
	//mx.HandleFunc("/deductonecart/{itemid}", deductonetoCartHandler(formatter)).Methods("PUT")  //cart 

	mx.HandleFunc("/getallcart/{userid}", cartAllDataHandler(formatter)).Methods("POST") //cart

	//mx.HandleFunc("/cart", 	addnewitemtoCartHandler(formatter)).Methods("POST") //items
	mx.HandleFunc("/insertcart", cartinsertHandler(formatter)).Methods("POST") //cart

	mx.HandleFunc("/orders/{userid}", placeOrderHandler(formatter)).Methods("POST") //cart
	//mx.HandleFunc("/postplaceorder", postplaceorderHandler(formatter)).Methods("POST") //orders

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



// func addonetoCartHandler(formatter *render.Render) http.HandlerFunc {
// 	return func(w http.ResponseWriter, req *http.Request) {
// 		params := mux.Vars(req)
// 		 fmt.Printf("params[id]=%s \n", params["itemid"])
//     	var m gumballMachine
//     	_ = json.NewDecoder(req.Body).Decode(&m)		
// 		session, err := mgo.Dial(mongodb_server)
//         if err != nil {
//                 panic(err)
//         }
//         defer session.Close()
//         session.SetMode(mgo.Monotonic, true)
// 		c := session.DB(mongodb_database).C(mongodb_collection_cart)
// 		var result1 bson.M
//         err = c.Find(bson.M{"itemid" : params["itemid"]}).One(&result1)
//         if err != nil {
//                 log.Fatal(err)
// 		} 
// 		fmt.Println("Qunatity of Result: ", result1["quantity"])
// 		//fmt.Println("Updated Qunatity of Result: ", result1["quantity"]+1)
// 		query := bson.M{"itemid" : params["itemid"]}
// 		change := bson.M{"$set": bson.M{ "quantity" : result1["quantity"].(int)+1}}
//         err = c.Update(query, change)
//         if err != nil {
//                 log.Fatal(err)
//         }
//        	var result bson.M
//         err = c.Find(bson.M{"itemid" : params["itemid"]}).One(&result)
//         if err != nil {
//                 log.Fatal(err)
//         }        
//         fmt.Println("Cart Data:", result )
// 		formatter.JSON(w, http.StatusOK, result)
// 	}
// }

//deductonetoCartHandler
// func deductonetoCartHandler(formatter *render.Render) http.HandlerFunc {
// 	return func(w http.ResponseWriter, req *http.Request) {
// 		params := mux.Vars(req)
// 		 fmt.Printf("params[id]=%s \n", params["itemid"])
//     	var m gumballMachine
//     	_ = json.NewDecoder(req.Body).Decode(&m)		
// 		session, err := mgo.Dial(mongodb_server)
//         if err != nil {
//                 panic(err)
//         }
//         defer session.Close()
//         session.SetMode(mgo.Monotonic, true)
// 		c := session.DB(mongodb_database).C(mongodb_collection_cart)
// 		var result1 bson.M
//         err = c.Find(bson.M{"itemid" : params["itemid"]}).One(&result1)
//         if err != nil {
//                 log.Fatal(err)
// 		} 
// 		fmt.Println("Qunatity of Result: ", result1["quantity"])
// 		fmt.Println("Updated Qunatity of Result: ", result1["quantity"].(int)-1)
// 		query := bson.M{"itemid" : params["itemid"]}
// 		change := bson.M{"$set": bson.M{ "quantity" : result1["quantity"].(int)-1}}
//         err = c.Update(query, change)
//         if err != nil {
//                 log.Fatal(err)
//         }
//        	var result bson.M
//         err = c.Find(bson.M{"itemid" : params["itemid"]}).One(&result)
//         if err != nil {
//                 log.Fatal(err)
//         }        
//         fmt.Println("Cart Data:", result )
// 		formatter.JSON(w, http.StatusOK, result)
// 	}
// }

func cartAllDataHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		session, err := mgo.Dial(mongodb_server)
        if err != nil {
                panic(err)
		}		
		params := mux.Vars(req)
		 fmt.Printf("params[id]=%s \n", params["userid"])
        defer session.Close()
        session.SetMode(mgo.Monotonic, true)
        c := session.DB(mongodb_database).C("cart")
        var result []bson.M
        err = c.Find(bson.M{"userid" : params["userid"]}).All(&result)
        if err != nil {
                log.Fatal(err)
        }
        fmt.Println("Cart Data:", result )
		formatter.JSON(w, http.StatusOK, result)
	}
}

// post method to insert data in cart
func cartinsertHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		session, err := mgo.Dial(mongodb_server)
        if err != nil {
                panic(err)
		}
		var payment bson.M
		_ = json.NewDecoder(req.Body).Decode(&payment)
        defer session.Close()
        session.SetMode(mgo.Monotonic, true)
        c := session.DB(mongodb_database).C("cart")
        err = c.Insert(payment)
		if err != nil {
			formatter.JSON(w, http.StatusNotFound, "Create Pado buildyment Error")
			return
		}
		fmt.Println("Create new payment:", payment)
		formatter.JSON(w, http.StatusOK, payment)
	}
}

func placeOrderHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		session, err := mgo.Dial(mongodb_server)
        if err != nil {
                panic(err)
		}	
		//uuid := uuid.NewV4()
		params := mux.Vars(req)
		 fmt.Printf("params[id]=%s \n", params["userid"])
        defer session.Close()
        session.SetMode(mgo.Monotonic, true)
		c := session.DB(mongodb_database).C("cart")
		//d := session.DB(mongodb_database).C("orders")
        var result []bson.M
		err = c.Find(bson.M{"userid" : params["userid"]}).All(&result) 
        if err != nil {
                log.Fatal(err)
        }
		fmt.Println("Cart Data:", result[0])
		fmt.Println("Cart Data:", len(result))
		jsonValue, _ := json.Marshal(result)
		//https://t6w0gmb9yh.execute-api.us-west-1.amazonaws.com/prod
		response, err := http.Post("https://t6w0gmb9yh.execute-api.us-west-1.amazonaws.com/prod/postplaceorder","application/json",bytes.NewBuffer(jsonValue))
		if err != nil {
			fmt.Printf("The HTTP request failed with error %s\n", err)
		} else {
			data, _ := ioutil.ReadAll(response.Body)
			fmt.Println(string(data))
		}

	// 	err = c.Remove(bson.M{"userid": params["userid"]})   //take the user id from url
        // if err != nil {
        //         log.Fatal(err)
        // }
		

		formatter.JSON(w, http.StatusOK, result)
	}
}