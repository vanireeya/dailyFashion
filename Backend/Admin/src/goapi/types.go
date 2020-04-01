package main

type Response struct{
	Status int
	Data string
}

type Item struct {
	Itemid string      
	Price string       
	Itemname string      
	Itemdesc string
	Itempath []string
	Quantity string
	Sold string
	temp [][]byte
}
var Items map[string] Item
