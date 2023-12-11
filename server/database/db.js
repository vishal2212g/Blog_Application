
import mongoose from "mongoose";
// import dotenv from 'dotenv'

// dotenv.config();

 const connection = async(URL)=>{

   
    try{
 
 await mongoose.connect(URL, {useNewUrlParser: true});
 
console.log("Database connected successfully");

   }catch(error) {
console.log("Error while connecting with the database", error); 
   }
};

export default connection;