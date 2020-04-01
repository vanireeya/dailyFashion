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
	"github.com/satori/go.uuid"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"io/ioutil"
	"bytes"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
) 
 
var mongodb_server = "10.0.1.102:27017"
var mongodb_database = "records"  
var mongodb_collection_items = "items" 
 

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
	mx.HandleFunc("/upload",uploadFile(formatter)).Methods("POST") //items
	mx.HandleFunc("/download/{path}",downloadFile(formatter)).Methods("GET") 
 
 
 	mx.HandleFunc("/itembyid/{itemid}", getItemByIDInventoryHandler(formatter)).Methods("GET") //items
 
 
	mx.HandleFunc("/inventory", inventoryAllDataHandler(formatter)).Methods("GET") //items 
	mx.HandleFunc("/admin", postDataForViewHandler(formatter)).Methods("POST") //items

	mx.HandleFunc("/cart", 	addnewitemtoCartHandler(formatter)).Methods("POST") //items 

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


const (
	S3_REGION = "us-west-1"
	S3_BUCKET = "fashiop-images"
)


func uploadFile(formatter *render.Render) http.HandlerFunc {
return func (w http.ResponseWriter, r *http.Request) {
	// fmt.Fprintf(w, "Uploading File")
	r.ParseMultipartForm(32 << 20)

	formdata := r.MultipartForm

	files := formdata.File["photos"]
	fmt.Println("File", len(files))

	var len int = len(files)
	// fmt.Println("File===>>>>>>", len)
	names := make([]string,len)
	s, err := session.NewSession(&aws.Config{Region: aws.String(S3_REGION)})
	if err != nil {
		log.Fatal(err)
	}
	for i, _ := range files {
		file, err := files[i].Open()
		defer file.Close()
		if err != nil {
			fmt.Fprintln(w, err)
			return
		}

		defer file.Close()
		fmt.Println("File", files[i].Size)
 
		var size int64 = files[i].Size
		buffer := make([]byte, size)
		file.Read(buffer)
		uuid := uuid.NewV4()
		files[i].Filename = uuid.String()
		_, err = s3.New(s).PutObject(&s3.PutObjectInput{
			Bucket:               aws.String(S3_BUCKET),
			Key:                  aws.String(files[i].Filename),
			ACL:                  aws.String("private"),
			Body:                 bytes.NewReader(buffer),
			ContentLength:        aws.Int64(size),
			ContentType:          aws.String(http.DetectContentType(buffer)),
			ContentDisposition:   aws.String("attachment"),
			ServerSideEncryption: aws.String("AES256"),
		})

		names[i] = "http://d1juoluhxbb7ba.cloudfront.net/"+files[i].Filename
	}
	formatter.JSON(w, http.StatusOK, names)

}
}

func downloadFile(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		params := mux.Vars(r)
		fmt.Printf("paraparamsms[id]=%s \n", params["path"])
		buff := &aws.WriteAtBuffer{}
		sess, _ := session.NewSession(&aws.Config{
			Region: aws.String(S3_REGION)},
		)

		downloader := s3manager.NewDownloader(sess)

		numBytes, err := downloader.Download(buff,
			&s3.GetObjectInput{
				Bucket: aws.String(S3_BUCKET),
				Key:    aws.String(params["path"]),
			})

		if err != nil {
			log.Fatalf("Unable to download item ")
		}
		// sEnc := b64.RawStdEncoding.EncodeToString(buff.Bytes())

		fmt.Println("Downloaded",numBytes, "bytes")
		w.Write(buff.Bytes())
		
	//	formatter.JSON(w, http.StatusOK, buff.Bytes())
	}
}
//getItemByIDInventoryHandler
func getItemByIDInventoryHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		session, err := mgo.Dial(mongodb_server)
        if err != nil {
                panic(err)
		}
		params := mux.Vars(req)
		 fmt.Printf("params[id]=%s \n", params["itemid"])
        defer session.Close()
        session.SetMode(mgo.Monotonic, true)
        c := session.DB(mongodb_database).C(mongodb_collection_items)
        var result bson.M
        err = c.Find(bson.M{"itemid" : params["itemid"]}).One(&result)
        if err != nil {
                log.Fatal(err)
        }
        fmt.Println("Inventory  Data By ID:", result )
		formatter.JSON(w, http.StatusOK, result)
	}
}

func inventoryAllDataHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		session1, err := mgo.Dial(mongodb_server)
        if err != nil {
                panic(err)
        }		
        defer session1.Close()
        session1.SetMode(mgo.Monotonic, true)
        c := session1.DB(mongodb_database).C(mongodb_collection_items)
        var result []Item
        err = c.Find(nil).All(&result)
        if err != nil {
                log.Fatal(err)
        }
		// fmt.Println("Inventory Data:", result )
		// fmt.Println("Result=>:", result[0] )
		// fmt.Println("Item path:", result[0].Itempath[0] )
		// fmt.Println("Item path res len: ", len(result))
		// fmt.Println("Item pat length:", len(result[0].Itempath) )

		

		// for i := 0; i < len(result); i++ {

		// 	for j := 0; j < len(result[i].Itempath); j++ {
		// 		var tempName string = result[i].Itempath[j];

		// fmt.Println("Item pat length:", tempName )
				

		// 		buff := &aws.WriteAtBuffer{}
		// 		sess, err3 := session.NewSession(&aws.Config{Region: aws.String(S3_REGION)},)
		// 		if err3!=nil{
		// 			log.Fatal(err3)
		// 		}
		// 		downloader := s3manager.NewDownloader(sess)

		// 		numBytes, err := downloader.Download(buff,
		// 			&s3.GetObjectInput{
		// 				Bucket: aws.String(S3_BUCKET),
		// 				Key:    aws.String(tempName),
		// 			})

		// 		if err != nil {
		// 			log.Fatalf("Unable to download item ")
		// 		}
				
		// 		fmt.Println("Downloaded", numBytes, "bytes")

		// 		result[i].temp[j]=buff.Bytes()
		// 		fmt.Println("Inventory Data:", result )
		// 		// w.Write(buff.Bytes())


		// 	}
		// }
		formatter.JSON(w, http.StatusOK, result)
	}
}

// API for admin
func postDataForViewHandler(formatter *render.Render)http.HandlerFunc{
	return func(w http.ResponseWriter,req *http.Request){
		
		uuid := uuid.NewV4()
		var itm Item
		 _ = json.NewDecoder(req.Body).Decode(&itm)
		itm.Itemid = uuid.String()
		fmt.Println(itm.Itempath)

		session, err := mgo.Dial(mongodb_server)
        if err != nil {
			fmt.Println("reached")
                panic(err)
        }
        defer session.Close()
        session.SetMode(mgo.Monotonic, true)
		c := session.DB(mongodb_database).C(mongodb_collection_items)
		
		err = c.Insert(itm)
		if err != nil {
			formatter.JSON(w, http.StatusNotFound, "Unable to add")
			return
		}
		fmt.Println("Added the item", itm)
		formatter.JSON(w, http.StatusOK, itm)
	}
}

// Add new item to cart
func addnewitemtoCartHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		session, err := mgo.Dial(mongodb_server)
        if err != nil {
                panic(err)
        }
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		//c := session.DB(mongodb_database).C("cart")
		d := session.DB(mongodb_database).C("items")

		var payment bson.M
		_ = json.NewDecoder(req.Body).Decode(&payment)
		
		fmt.Println("itemid",payment["itemid"])
		// params := mux.Vars(req)
		//  fmt.Printf("params[id]=%s \n", params["itemid"])
		var result1 bson.M
        err = d.Find(bson.M{"itemid" : payment["itemid"]}).One(&result1)
        if err != nil {
                log.Fatal("error is ",err)
		} 
		result1["quantity"]=payment["quantity"]
		result1["userid"]=payment["userid"]
		// var ar []byte=result1.([]byte)
		// r := bytes.NewReader(ar)
		jsonValue, _ := json.Marshal(result1)
		
		response, err := http.Post("https://82kh9kl8pc.execute-api.us-west-1.amazonaws.com/prod/insertcart","application/json",bytes.NewBuffer(jsonValue))
		if err != nil {
			fmt.Printf("The HTTP request failed with error %s\n", err)
		} else {
			data, _ := ioutil.ReadAll(response.Body)
			fmt.Println(string(data))
		}

		// err = c.Insert(result1)
		// if err != nil {
		// 	formatter.JSON(w, http.StatusNotFound, "Create Payment Error")
		// 	return
		// }
		// fmt.Println("Create new payment:", payment)
		formatter.JSON(w, http.StatusOK, payment)
	}
}