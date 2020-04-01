# Team Flash Project

## MongoDB Schema
  
### Project Modules
- User
- Admin
- Cart
- Order

## User Schema

```
var UserSchema = new Schema({  
    fname: { type: String, required: true
    },  
    lname: { type: String, required: true  
    },  
    email: { type: String, required: true  
    }, 
    password:{type:String, required: true  
    },
    type:{type:String}
});  
```
## Inventory Schema

```
var InventorySchema = new Schema({  
    itemid: { type: String, required: true
    },  
    itemname: { type: String, required: true  
    },  
    quantity: { type: String, required: true  
    }, 
    userid:{type:String, required: true  
    },
    itempath:{type:String},
    sold:{type:String, required: true  
    },
    itemdesc: { type: String, required: true  
    }
});  

```

## Cart Schema

```
var CartSchema = new Schema({  
    itemid: { type: String, required: true
    },  
    itemname: { type: String, required: true  
    },  
    quantity: { type: String, required: true  
    }, 
    userid:{type:String, required: true  
    },
    itempath:{type:String},
});
```

## Orders Schema
```
var OrderSchema = new Schema({  
    itemid: { type: String, required: true
    },  
    itemname: { type: String, required: true  
    },  
    quantity: { type: String, required: true  
    }, 
    userid:{type:String, required: true  
    },
    itempath:{type:String},
}); 
```

