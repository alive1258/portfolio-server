const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

    // Add projects
    app.post("/api/v1/projects", async (req, res) => {
      const addProjects = req.body;
      const result = await projectCollection.insertOne(addProjects);
      res.send(result);
    });
    // get all projects
    app.get("/api/v1/projects", async (req, res) => {
      const result = await projectCollection.find().toArray();
      res.send(result);
    });

    // get a single projects by its ID
    app.get("/api/v1/projects/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await projectCollection.findOne(query);
      res.send(result);
    });

    // update projects
    app.put("/api/v1/projects/:id", async (req, res) => {
      const id = req.params.id;
      const updatedProject = req.body;

      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const project = {
        $set: {
          title: updatedProject.name,
          tec1: updatedProject.tec1,
          tec2: updatedProject.tec2,
          tec3: updatedProject.tec3,
          rating: updatedProject.rating,
          review: updatedProject.review,
          category: updatedProject.category,
        },
      };
      const result = await projectCollection.updateOne(
        filter,
        project,
        options
      );

      res.send(result);
    });

    //delete projects
    app.delete("/api/v1/projects/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await projectCollection.deleteOne(query);
      res.send(result);
    });

    // Add skills
    app.post("/api/v1/skills", async (req, res) => {
      const addSkills = req.body;
      const result = await skillsCollection.insertOne(addSkills);
      res.send(result);
    });

    // get all skills
    app.get("/api/v1/skills", async (req, res) => {
      const result = await skillsCollection.find().toArray();
      res.send(result);
    });

    // get a single skills by its ID
    app.get("/api/v1/skills/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await skillsCollection.findOne(query);
      res.send(result);
    });

    // update skills
    app.put("/api/v1/skills/:id", async (req, res) => {
      const id = req.params.id;
      const updatedSkill = req.body;

      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const skill = {
        $set: {
          title: updatedSkill.title,
          quantity: updatedSkill.quantity,
          category: updatedSkill.category,
        },
      };
      const result = await skillsCollection.updateOne(filter, skill, options);

      res.send(result);
    });

    //delete skills
    app.delete("/api/v1/skills/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await skillsCollection.deleteOne(query);
      res.send(result);
    });

    // Add educations
    app.post("/api/v1/educations", async (req, res) => {
      const addEducations = req.body;
      const result = await educationCollection.insertOne(addEducations);
      res.send(result);
    });
    // educations
    app.get("/api/v1/educations", async (req, res) => {
      const result = await educationCollection.find().toArray();
      res.send(result);
    });

    // get a single educations by its ID
    app.get("/api/v1/educations/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await educationCollection.findOne(query);
      res.send(result);
    });

    // update educations
    app.put("/api/v1/educations/:id", async (req, res) => {
      const id = req.params.id;
      const updatedEducation = req.body;

      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const education = {
        $set: {
          title: updatedEducation.title,
          quantity: updatedEducation.quantity,
          category: updatedEducation.category,
        },
      };
      const result = await educationCollection.updateOne(
        filter,
        education,
        options
      );

      res.send(result);
    });

    //delete educations
    app.delete("/api/v1/educations/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await educationCollection.deleteOne(query);
      res.send(result);
    });

    // Add experiences
    app.post("/api/v1/experiences", async (req, res) => {
      const addExperiences = req.body;
      const result = await experienceCollection.insertOne(addExperiences);
      res.send(result);
    });
    // experiences
    app.get("/api/v1/experiences", async (req, res) => {
      const result = await experienceCollection.find().toArray();
      res.send(result);
    });

    // get a single experiences by its ID
    app.get("/api/v1/experiences/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await experienceCollection.findOne(query);
      res.send(result);
    });

    // update experiences
    app.put("/api/v1/experiences/:id", async (req, res) => {
      const id = req.params.id;
      const updatedExperiences = req.body;

      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const experience = {
        $set: {
          title: updatedExperiences.title,
          quantity: updatedExperiences.quantity,
          category: updatedExperiences.category,
        },
      };
      const result = await experienceCollection.updateOne(
        filter,
        experience,
        options
      );

      res.send(result);
    });

    //delete experiences
    app.delete("/api/v1/experiences/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await experienceCollection.deleteOne(query);
      res.send(result);
    });

    // Add blogs
    app.post("/api/v1/blogs", async (req, res) => {
      const addBlogs = req.body;
      const result = await blogCollection.insertOne(addBlogs);
      res.send(result);
    });
    // get all blogs
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

    // update blogs
    app.put("/api/v1/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const updatedBlog = req.body;

      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const blog = {
        $set: {
          title: updatedBlog.title,
          quantity: updatedBlog.quantity,
          category: updatedBlog.category,
        },
      };
      const result = await blogCollection.updateOne(filter, blog, options);

      res.send(result);
    });

    //delete blogs
    app.delete("/api/v1/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await blogCollection.deleteOne(query);
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
