const express = require('express');
// ____ cors ---
const cors = require ('cors');
//
const ObjectId = require('mongodb').ObjectId;

// ____ mongo client ___ 
const { MongoClient } = require('mongodb');
// ____ secuer pass ___ 
require('dotenv').config()
const app =express();
const port = process.env.PORT || 5000;
 
// ____ middleware__
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0k3m9.mongodb.net/myFirstDatabase?
retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run (){
    try{
await client.connect();
console.log('database connected successfully');
const database = client.db('Hungry');
const productsCollection = database.collection('foods');

app.get('/foods', async(req,res)=>{
               const cursor = productsCollection.find({});
               const products =await cursor.toArray();
               res.send(products);
           })
           //  post api products
           app.post('/foods', async(req,res)=>{
               const food= req.body;
               console.log('hit api ',product);

               
 const result= await productsCollection.insertOne(food);
console.log(result);
res.json(result)
})

app.get ('/foods/:id',async(req,res)=>{
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const product = await productsCollection.findOne(query);
    res.json(product);

})

} 





finally{
       
        //        await client.close();
}       
}
run().catch(console.dir);


app.get('/', (req,res)=>{
    res.send('running Essantial oils');
    })
     
    app.listen(port ,()=>{
                   console.log("running hungry on porat", port)
    })