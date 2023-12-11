import express from 'express';

import dotenv from 'dotenv';

import cors from 'cors';

import bodyParser from 'body-parser';

import Connection from './database/db.js';

 import Router from './routes/route.js';
import path from 'path'; 
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const __dirname =path.resolve

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use('/', Router);



app.use(express.static(path.join(__dirname, "./client/build")));

app.get('*', function(_, res){
  res.sendFile(path.join(__dirname, "./client/build/index.html"), function(err){
    if (err) {
      res.status(500).send(err);
    }
  });
});
//
if (process.env.NODE_ENV === 'production'){
    app.use(express.static("client/build"));
}
//
const PORT = process.env.PORT || 8000;

app.listen (PORT,()=> console.log(`server is runnig sussecfully on PORT 
 ${PORT}`));



const USERNAME= process.env.DB_USERNAME;
 const PASSWORD= process.env.DB_PASSWORD;

 const URL =  process.env.MONGODB_URL || `mongodb+srv://${USERNAME}:${PASSWORD}@blog-app.yaqxg8t.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`
 Connection(URL);
