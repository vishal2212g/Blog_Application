

import Post from '../model/post.js';


export const createPost = async (request, response) => {
 try{
   // console.log("boby", request.body)
    const post = await  new Post (request.body);
 post.save();
 
 return response.status (200).json('post saved successfully');
 }
 catch (error){
    return response.status (500).json(error);
 }
}

export const getAllPosts = async (request, response) =>{
  // category
  let category = request.query.category;
//   console.log ("ca", category );
  let posts;

  try {
     if (category){
      posts = await Post.find ({categories
         :category})

    }else{
       posts = await Post.find ({});
    }
      //
      return response.status(200).json(posts);
  }catch(error){
   return response.status(500).json({msg: error.message});
  } 
}


//getpost details

export const getPost = async (request, response) => {
   try{
      const post = await Post.findById(request.params.id);
      return response.status (200).json(post);
   }catch(error){
      return response.status(500).json({msg: error.message});
   }
}

//update post  after api  config, route then post controller

export const updatePost = async (request, response) => {
   try{
      const post =await Post.findById(request.params.id);
   if (!post){
      return response.status(404).json({msg: 'post not found'});
   }
   await Post.findByIdAndUpdate(request.params.id,{$set:request.body})
   //notic here
   return response.status(200).json({msg: 'Post updted successfully'});
   }
   catch(error){
      return response.status(500).json({error: error.message});

   }
}

//deletePost

export const deletePost = async(request, response) => {
   // console.log("boby", request.params.id)
   try{
      const post = await Post.findById(request.params.id);
      // console.log ("ll", post );
      if(!post) {
         return response.status(404).json({msg: 'post not found'});
      }
      await Post.deleteOne({_id:post._id})
      // console.log("ww",post);

      return response.status(200).json({msg: 'post deleted successfully'});
   }catch(error){
      return response.status(500).json({error: error.message});
   }
   }
