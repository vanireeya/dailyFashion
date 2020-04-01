# Team Flash Project

## API Schema

### Project Modules
- User
- Admin
- Cart
- Order

## User 

### POST /user
```
This api is used for Login
POST /login HTTP/1.1
Accept: application/json

Body : {
    "username" :"admin@gmail.com",
    "password" :"admin"
}
```

### POST /user
```
This api is used for Registering user
POST /signup HTTP/1.1
Accept: application/json

Body : {
    "username" :"admin@gmail.com",
    "password" :"admin",
    "name":"admin"
}
```

### GET /user
```
This api is used for getting all the items from inventory
GET /inventory HTTP/1.1
Accept: application/json

Response:
- 204 No Content
- 404 Not Found
- 200 Success
```

## Admin

### POST /admin
```
This api is used to upload data to inventory
POST /admin HTTP/1.1
Accept: application/json

Body : {
    "itemid" :"1",
    "itemname" :"shirt"
    "quantity":"20"
    "sold":"0"
    itemdesc":"# HD Cotton™ T-Shirt"
    itempath:"abc.html"
}

```
### GET /admin
```
This api is used for getting all the items from inventory on the basis of sold items.
GET /admin HTTP/1.1
Accept: application/json

Response: {"items": [{itemname, quantity, itemdescription, image_url, sold}]}
- 200 Success
- 404 Not Found
```


## Cart

### POST /cart
```
This api is used to add new item to cart. It will take itemid from
front end and get the data from inventory table on the basis of itemid
and insert the data in cart collection.

POST /cart HTTP/1.1
Accept: application/json

Body : {
    "itemid" :"1",
    "quantity":"20"
    "userid":"2"
}
```

### PUT /cartadd
```
This api is used to increment the quantity of an item by 1
PUT /cart/{itemid} HTTP/1.1
Accept: application/json

Response:
- 200 Success
- 404 Not Found

```
### PUT /cartdeduct
```
This api is used to decrement the quantity of an item by 1
PUT /cart/{itemid} HTTP/1.1
Accept: application/json

Response:
- 200 Success
- 404 Not Found
```

### GET /cart
```
This api is used for getting all the items from cart of the particular userid.
GET /cart/{userid} HTTP/1.1
Accept: application/json

Response: {"items": [{itemname, quantity, itemdescription, image_url, sold}]}
- 200 Success
- 404 Not Found
```

## Orders

### GET /orders
```
This api is used for getting all the items from orders of the particular userid.
GET /oredrs/{userid} HTTP/1.1
Accept: application/json

Response: {"items": [{itemname, quantity, itemdescription, image_url, sold}]}
- 200 Success
- 404 Not Found
```
### PUT /orders
```
This api is used to place a new order
PUT /orders/{userid} HTTP/1.1
Accept: application/json

Response:
- 200 Success
- 404 Not Found
```
