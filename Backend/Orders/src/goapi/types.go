package main
 
type order struct {
	Id             	string 	
	OrderStatus 	string	
}


type Response struct{
	Status int
	Data string
}

var orders map[string] order
