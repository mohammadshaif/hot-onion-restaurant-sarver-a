const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


app.use(cors())
app.use(bodyParser.json())

const uri = process.env.DB_PATH;

let client = new MongoClient(uri, { useNewUrlParser: true });



app.get('/foods',  (req, res) => {
  client = new MongoClient(uri, { useNewUrlParser: true });
      const product = req.body;
      client.connect(err => {
      const collection = client.db("onlineFood").collection("foods");
      collection.find().toArray ((err, documents)=>{
        if (err) {
          console.log(err); 
          res.status(500).send({massage:err});
        }else{
          res.send(documents);
        }
        
      }); 
      client.close();
    });
  })

  app.get('/chooseData',  (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
        const product = req.body;
        client.connect(err => {
        const collection = client.db("onlineFood").collection("chooseData");
        collection.find().toArray ((err, documents)=>{
          if (err) {
            console.log(err); 
            res.status(500).send({massage:err});
          }else{
            res.send(documents);
          }
          
        }); 
        client.close();
      });
    })
  


  app.get('/food/:id', (req,res)=>{
      const id = req.params.id;
      
      client = new MongoClient(uri, { useNewUrlParser: true });
      const product = req.body;
      client.connect(err => {
      const collection = client.db("onlineFood").collection("foods");
      collection.find({id}).toArray ((err, documents)=>{
        if (err) {
          console.log(err); 
          res.status(500).send({massage:err});
        }
        else{
          res.send(documents[0]);
        }
        
      }); 
      client.close();
    });
  })

 app.post('/getfoodsBykey', (req,res)=>{
    const key = req.params.key;
    const productKeys = req.body;
    
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("onlineFood").collection("foods");
    collection.find({key:{ $in:productKeys }}).toArray ((err, documents)=>{
      if (err) {
        console.log(err); 
        res.status(500).send({massage:err});
      }
      else{
        res.send(documents);
      }
      
      }); 
      client.close();
    });
})


app.post('/placeOrder', (req , res) =>{
  const orderDetails = req.body;
  orderDetails.orderTime = new Date();
  console.log(orderDetails);
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("onlineFood").collection("orders");
    collection.insertOne(orderDetails,(err, result)=>{
      if (err) {
        //console.log(err); 
        res.status(500).send({massage:err});
      }else{
        res.send(result.ops[0]);
      }
       
    }); 
    client.close();
  });
 
})
app.post('/addChooseData', (req , res) =>{
  const product = req.body;
  client = new MongoClient(uri, { useNewUrlParser: true });
    //console.log(product);
  client.connect(err => {
    const collection = client.db("onlineFood").collection("chooseData");
    collection.insert(product,(err, result)=>{
      if (err) {
        console.log(err); 
        res.status(500).send({massage:err});
      }else{
        res.send(result.ops[0]);
      }
       
    }); 
    client.close();
  });
 
})

app.post('/addFood', (req , res) =>{
  const product = req.body;
  client = new MongoClient(uri, { useNewUrlParser: true });
    console.log(product);
  client.connect(err => {
    const collection = client.db("onlineFood").collection("foods");
    collection.insert(product,(err, result)=>{
      if (err) {
        console.log(err); 
        res.status(500).send({massage:err});
      }else{
        res.send(result.ops[0]);
      }
       
    }); 
    client.close();
  });
 
})
const port = process.env.PORT || 3000;
  app.listen(port , ()=>console.log("Listenting  to port 3000"));