// PLEASE OPEN THIS FILE IN VISUAL STUDIO CODE EDITOR FOR SIMILAR EXPERIENCE.


const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

//connecting to local mongodb(compass) in my pc and creating a database named: Trainabot
mongoose.connect('mongodb://localhost/Trainabot')
  .then(()=> console.log('connected to MongoDB...'))
  .catch(err => console.error('could not connect to MongoDB..', err))

  //creating a schema for the user documents in users collection 
  var usersSchema = new mongoose.Schema({
    userkey: Number,
    Name: String,
    phonenumber: Number,
    email: String,
    address: String,
    pincode: Number
});
//creating a schema for the order documents in orders collection 
var ordersSchema = new mongoose.Schema({
    userkey: [Number],
    product: String,
    quantity: Number,
    cost: Number,
    manufactured_date: Date
    
});

//creating a class to model the schema
var User = mongoose.model('User', usersSchema);
var Order = mongoose.model('Order', ordersSchema);
//creating post http request to users route (json format user doc details is sent through postman)
  app.post('/users', async(req, res)=>{
     const result = await User.insertMany(req.body);
     //console.log(result);
     res.send("Users Posted Succesfully")
  });
  //creating post http request to orders route (json format order doc details is sent through postman)

  app.post('/orders',async(req, res) => {
      const orders = await Order.insertMany(req.body);
      //console.log(orders);
      res.send("Orders Posted Succesfully")
  })
  
 
//creating a get http request to users route
app.get('/users', async(req,res)=>{
    const users = await User.find();
    res.send(users);
});
//creating a get http request to orders route (the below code gets the orders of manjunadhreddy(having userkey:1))                                                     
app.get('/orders', async(req,res)=>{
    const orders = await Order.find({userkey: {$in : 1 }});
    res.send(orders);
});                                                       


//creating a server using environment variables
const port = process.env.PORT || 3000;
app.listen(port, ()=>{console.log(`listening on port ${port}....`)});

/* I have attached the screenshots of the various operations that I have
   performed on my local computer :

   
   1. successfully Connected  to local mongo db
   2. Created two collections in Trainabot database in mongodb.
   3. Created Users and orders collection with some keys.
   4. Created APIs to create the user and create an order and get the list of users and list of orders for
      user named manjunadhreddy
   5.Given a relation between two collection using userkey   
             */
   