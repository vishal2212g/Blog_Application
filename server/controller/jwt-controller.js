import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticateToken = (request, response, next) => {
  const authHeader = request.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // console.log('vvv', authHeader)

  if (token == null) {
    return response.status(401).json({ msg: "token is missing" });
  }
 

  jwt.verify(token,process.env.ACCESS_SECRET_KEY, (error, user) => {
    if (error)
     {
      return response.status(403).json({ msg: "invalid token" 
      });
    }

    request.user = user;
    next();
  });
};

export const getPost = async (request, response) =>{
  try{
    const post = await Post.findById(request.paramas.id);
    return response.status(200).json(post);
  } catch (error){
    return response.status(500).json({msg: error.message});
  }
}