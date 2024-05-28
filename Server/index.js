const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
require("dotenv").config();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.get("/", async (req, res) => {
  res.send("bistro running");
});

// MongoDB configuration

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nkzn5jr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 })

    const menuCollection = client.db("bistroDb").collection("menu");
    const userCollection = client.db("bistroDb").collection("users");
    const reviewsCollection = client.db("bistroDb").collection("reviews");
    const cartCollection = client.db("bistroDb").collection("carts");
    const paymentCollection = client.db("bistroDb").collection("payments");
    // middlewares

    const verifyToken = (req, res, next) => {
      // console.log("inside verify token", req.headers.authorization);
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "landu unathorized access" });
      }
      const token = req.headers.authorization.split(" ")[1];
      // console.log(token);
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
          return res.status(403).send({ message: "forbidden access" });
        }
        req.user = decoded;
        console.log("email from verify token", req.user.email);
        next();
      });
    };
    // verify Admin
    const verifyAdmin = async (req, res, next) => {
      const email = req.user.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };
    // Token generate
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10h",
      });
      res.send({ token });
    });

    // Payment related APIs
    app.post("/payments", async (req, res) => {
      const payment = req.body;
      console.log(payment);
      const result = await paymentCollection.insertOne(payment);
      const query = {
        _id: {
          $in: payment.cartIds.map((id) => new ObjectId(id)),
        },
      };
      console.log(query);
      const deleteCart = await cartCollection.deleteMany(query);
      res.send({ result, deleteCart });
    });

    // Stripe payment intent
    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({ clientSecret: paymentIntent.client_secret });
    });
    // Get all menu information
    app.get("/menu", async (req, res) => {
      const menuList = await menuCollection.find().toArray();
      res.send(menuList);
    });
    // Get single menu information
    app.get("/food/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await menuCollection.findOne(filter);
      res.send(result);
    });

    // add menu item

    app.post("/menu", verifyToken, verifyAdmin, async (req, res) => {
      const item = req.body;
      const result = await menuCollection.insertOne(item);
      res.send(result);
    });
    // Update food menu item
    app.patch("/menu/:id", async (req, res) => {
      const id = req.params.id;
      const updatedInfo = req.body;
      // const
      // console.log(id);
      // console.log(updatedInfo);
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          name: updatedInfo.name,
          recipe: updatedInfo.recipe,
          image: updatedInfo.image,
          category: updatedInfo.category,
          price: updatedInfo.price,
        },
      };
      const result = await menuCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });
    // Delete a food menu
    app.delete("/menu/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const filter = { _id: new ObjectId(id) };
      // console.log(filter);
      const result = await menuCollection.deleteOne(filter);
      res.send(result);
      // console.log(result);
    });
    // add users to user collection
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
    //
    // Get all users
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      // console.log(req.headers);
      const result = await userCollection.find().toArray();
      res.send(result);
    });
    // Check admin
    app.get("/users/admin/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      console.log("admin mail", req.user.email);
      if (email !== req.user.email) {
        res.status(403).send({ message: "forbidden access" });
      }
      const query = { email };
      const user = await userCollection.findOne(query);
      console.log("user from verify admin", user);
      let admin = false;
      if (user?.role === "admin") {
        admin = true;
      } else {
        console.log("this user is not an admin");
      }
      res.send({ admin });
    });
    // Make admin
    app.patch("/users/admin/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const udpatedDoc = {
        $set: {
          role: "admin",
        },
      };
      const result = await userCollection.updateOne(filter, udpatedDoc);
      res.send(result);
    });

    // Delete a user
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      // const userFound = await userCollection.findOne(query);
      res.send(result);
    });
    // get menu by category
    app.get("/menucategory", async (req, res) => {
      const category = req.query.category;
      const currentPage = parseInt(req.query.skip);
      const limit = parseInt(req.query.limit);
      const skip = (currentPage - 1) * limit;
      const filter = { category };
      const result = await menuCollection
        .find(filter)
        .skip(skip)
        .limit(limit)
        .toArray();
      res.send(result);
    });
    // Get all reviews
    app.get("/reviews", async (req, res) => {
      const reviewList = await reviewsCollection.find().toArray();
      res.send(reviewList);
    });
    // Add cart
    app.post("/carts", async (req, res) => {
      const cartInfo = req.body;
      console.log(cartInfo);
      const result = await cartCollection.insertOne(cartInfo);
      res.send(result);
    });
    // delete from cart
    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const filter = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(filter);
      res.send(result);
    });

    // get number of order followed by a particular user
    app.get("/carts", async (req, res) => {
      const email = req.query.email;
      const filter = { customerEmail: email };
      const result = await cartCollection.find(filter).toArray();
      //   const result = await cartCollection.find().toArray();
      res.send(result);
    });
    // get the number of item in menu collection
    app.get("/count", async (req, res) => {
      const category = req.query.category;
      const filter = { category: category };
      const result = await menuCollection.countDocuments(filter);
      res.send({ productCounts: result });
    });

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
  console.log(`bistro running on ${port}`);
});
