package main
  

type User struct {
	User_id string `json:"user_id"`
	Email string `json:"email"`
	Password string `json:"password"`
	Type string `json:"type"`
	Fname string `json:"fname"`
	Lname string `json:"lname"`
	Phno string `json:"phno"`
	Address string `json:"address"`
 
}
type Response struct{
	Status int
	Data string
}
 
 
