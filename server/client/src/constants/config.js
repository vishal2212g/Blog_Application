
//API notification massage

export const API_NOTIFICATION_MESSAGES =
{
    loading: {
        title:'Loading...',  
     message: 'Data is being loaded ,please wait'

    },

success:{
tittle: 'Success',
message: 'Data is successfully loaded'

},
responseFailure:{
    tittle:"Error",
    message: ' an error occurred while fatching response from the server. Please try again'
},

requestFailure:{
    tittle:"Error",
    message: "an error occurred while parsing requsest data"
},

networkError:{
    tittle:"Error",
    message: "Unable to connect with the server, Please check internet connectivity and try again latter"
}

}



//API SERVICE CALL
//SAMPLE REQUEST 
//NEED SERVICE CALL : {url:'/', method: "POST/GET/PUT/DELETE" parans:true/false, query:  true/false}

export const SERVICE_URLS={
    userSignup: {url:'/signup', method: "POST"},
    userLogin:{ url:'/login', method: "POST"},

     uploadFile:{url:'/file/upload', method: "POST", headers: {
      "content-type": "multipart/form-data",
    }},

    //  uploadFile: { url: '/file/upload', method: "Post"},

    //   createPost: {url: 'create', method: 'POST', headers: {
    //     "content-type": "multipart/form-data",
    //   }}
     createPost: {url: 'create', method: 'POST'},


    //  get Api

    getAllPosts: {url: '/posts', method: 'GET', params: true},

    //details Api call
    getpostById: {url: 'post', method: 'GET', query: true},


    //update api call and go to server routes page call
    updatePost: {url: 'update', method: 'PUT', query: true},

    // deletePost api
    deletePost: {url:'delete', method:'DELETE', query: true},

    //comment API
    newComment:{url: '/comment/new', method:'POST'},
    getAllComments: { url:'comments', method:'GET',query:true},

    //delete comments api

    deleteComment:{url:'comment/delete', method:'DELETE', query:true}
}