const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.Dbuser}:${process.env.Dbpass}@cluster0.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("user");
    const usercollection = database.collection("usercollections");

    app.get("/user", async (req, res) => {
      const cursor = usercollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await usercollection.findOne(query);
      res.send(user);
    });
    app.post("/user", async (req, res) => {
      const user = req.body;
      const result = await usercollection.insertOne(user);
      res.send(res);
    });
    // app.put("/user/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const filter = { _id: new ObjectId(id) };
    //   const options = { upsert: true };
    //   const updateDoc = {
    //     $set: { name: req.body.name, email: req.body.email },

    //   };
    // });

    app.put("/user/:id", async (req, res) => {
      const id = req.params.id;
      const updatedTip = req.body;
      const filter = { _id: new ObjectId(id) };
      const update = { $set: updatedTip };
      const result = await tipsCollection.updateOne(filter, update);
      res.send(result);
    });
    app.delete("/user/:id", async (req, res) => {
      // console.log(req.params.id);
      const id = req.params.id;
      console.log(id);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
