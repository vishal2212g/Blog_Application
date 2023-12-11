


import{useEffect, useState} from 'react';
import{API} from '../../../service/api';
import {Box, Grid }from '@mui/material'

//use for search category
import {useSearchParams, Link} from 'react-router-dom';




//component
import Post from './Post';
const Posts =() => {
    const[posts, setPosts]= useState([]);
// intialize search params hook
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category'); 

     
    //api call
    useEffect(() =>{
        const fetchData = async() =>{
            let response = await API.getAllPosts({category : category  ||''});
            //params pass in category , is not, will gone empty
            if(response.isSuccess){
                setPosts(response.data);
            }
    }
    fetchData ();
    },[category]); //category passcall
    return(
       
        <>
       {
        posts&& posts.length >0? posts.map(post=>(
<Grid item lg = {3} sm = {4} xs = {12}>

<Link to = {`details/${post._id}`} style ={{textDecoration:'none',}}>
<Post post = {post}/>
</Link>
</Grid>
        )):<Box style ={{color: '#878787', margin:'30px 80px', fontsize:18 }}>No Data available to display</Box>
       } 
        </>
    )

}

export default Posts;