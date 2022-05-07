const express = require("express");
require('dotenv').config();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

//user: shafiqueFirmHouse
//pass: MnWfRCCvBvocPinD

// const uri = "mongodb+srv://shafiqueFirmHouse :MnWfRCCvBvocPinD@cluster0.opjrt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.opjrt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run(){
    try{
        await client.connect();
        const myCollection = client.db('firmHouse').collection('allAnimals');
        app.get('/collection',async(req, res)=>{
            const query = {};
            const cursor = myCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })
    }
    finally{

    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("My code is running for the first time");
});

app.listen(port, () => {
  console.log("My code is listening as", port);
});
