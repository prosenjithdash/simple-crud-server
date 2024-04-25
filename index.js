const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
const port = process.env.PORT || 2000

// Middleware
app.use(cors());
app.use(express.json());


// mongoDB Atlas project code

//// create data on server step - 01 username & password set
const uri = "mongodb+srv://prosenjithEduRecap:1eATnvszJZ8Qvc5I@cluster0.kybpity.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
      await client.connect();

    //// create data on server step - 04
    const database = client.db("usersDB");
    const userCollection = database.collection("users");
      
      
      // Read data step - 01 => users.jsx (ui side)
      // Read data step - 02 => users.jsx (ui side)
      // Read data step - 03 get user data from database
        app.get('/users', async(req, res) => {
            const cursor = userCollection.find()
            const result = await cursor.toArray();
            res.send(result);
        })
      // Read data step - 04 show display from database data (ui side)
      
      // Update data step - 04 (index.js server side)
    // Update data step - 05 (update.jsx ui side)
    app.get('/users/:id', async(req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const user = await userCollection.findOne(query)
        res.send(user);

        })




      //// create data on server step - 02 post api
      //// step - 03 client side with fetch, method , headers, body
    // post api
      app.post('/users', async(req, res) => {
          const user = req.body;
          console.log('New user:', user);
          const result = await userCollection.insertOne(user);
          res.send(result);
      });

      // Update data step - 07 (index.js server side)
    // Update data step - 08 (update.jsx ui side)

        app.put('/users/:id', async(req, res) => {
        const id = req.params.id;
            const user = req.body;
            console.log(id, user)

           // Update data step - 09 (index.js server side)
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
           
             const updatedUser = {
                $set: {
                     name: user.name,
                    email: user.email
                 },
                 
             };
            const result = await userCollection.updateOne(filter, updatedUser, options);
            res.send(result);




        })

      ////Delete data step - 3  (index.js server side)
      app.delete('/users/:id', async (req, res) => {
          const id = req.params.id;
          console.log('Please delete id from database', id)
          const query = { _id: new ObjectId(id) };
          const result = await userCollection.deleteOne(query);
          res.send(result)


      })

    ////Delete data step - 4  (users.jsx ui side)


      
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);


app.get('/', (req, res) => {
  res.send('Exploring MongoDB CRUD Operation.')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})