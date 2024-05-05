const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1yov7jc.mongodb.net/?retryWrites=true&w=majority`;

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
    const projectCollection = client.db("portfolioDB").collection("projects");
    const skillsCollection = client.db("portfolioDB").collection("skills");
    const educationCollection = client
      .db("portfolioDB")
      .collection("educations");

    const experienceCollection = client
      .db("portfolioDB")
      .collection("experiences");
    const blogCollection = client.db("portfolioDB").collection("blogs");

    // projects
    app.get("/api/v1/projects", async (req, res) => {
      const result = await projectCollection.find().toArray();
      res.send(result);
    });

    // Route to get a single product by its ID
    app.get("/api/v1/projects/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await projectCollection.findOne(query);
      res.send(result);
    });

    // skills
    app.get("/api/v1/skills", async (req, res) => {
      const result = await skillsCollection.find().toArray();
      res.send(result);
    });
    // educations
    app.get("/api/v1/educations", async (req, res) => {
      const result = await educationCollection.find().toArray();
      res.send(result);
    });
    // experiences
    app.get("/api/v1/experiences", async (req, res) => {
      const result = await experienceCollection.find().toArray();
      res.send(result);
    });
    // blogCollection
    app.get("/api/v1/blogs", async (req, res) => {
      const result = await blogCollection.find().toArray();
      res.send(result);
    });
    // Route to get a single blogs by its ID
    app.get("/api/v1/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await blogCollection.findOne(query);
      res.send(result);
    });

    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
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

app.get("/", (req, res) => {
  res.send("Portfolio is Making");
});

app.listen(port, () => {
  console.log(`Portfolio is Making on port ${port}`);
});
