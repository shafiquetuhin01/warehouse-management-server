const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.opjrt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const myCollection = client.db("firmHouse").collection("allAnimals");
    app.get("/collection", async (req, res) => {
      const query = {};

      const cursor = myCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });
    app.get("/collection/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await myCollection.findOne(query);
      res.send(service);
    });
    app.get('/collection/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const update = await myCollection.findOne(query);
      res.send(update);
  });
    app.post('/collection', async (req, res) => {
      const newService = req.body;
      const result = await myCollection.insertOne(newService);
      res.send(result);
  });

  app.delete('/collection/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await myCollection.deleteOne(query);
    res.send(result);
});
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("My code is running for the first time, ok this is right");
});

app.listen(port, () => {
  console.log("My code is listening as", port);
});
