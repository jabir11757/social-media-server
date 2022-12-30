const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');
const port = process.env.PORT || 5000;
require('dotenv').config()

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yt0e1fj.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const database = client.db("endGame");
        const posts = database.collection("posts");

        app.post('/posts', async (req, res) => {
            const post = req.body;
            const result = await posts.insertOne(post);
            res.send(result)
        })

        app.get('/posts', async (req, res) => {
            const query = {};
            const post = await posts.find(query).toArray();
            res.send(post);
        })

        app.get('/posts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const post = await posts.findOne(query);
            res.send(post);
        })
    }
    finally {

    }
}
run().catch(err => console.error(err))

app.get('/', (req, res) => {
    res.send('Social Media server is running...')
})

app.listen(port, (req, res) => {
    console.log('Social Media server is running on port', port)
})