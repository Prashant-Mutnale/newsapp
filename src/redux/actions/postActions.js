import {FETCH_POSTS, NEW_POSTS} from './types'

export const fetchPosts = (idlistdatt, sortid) => dispatch =>{
    // console.log("gotcat", iddatat)
    console.log("gotid", idlistdatt)
    console.log("sortid", sortid)
    // let datacategory = iddatat
    let datachannel = idlistdatt
    console.log("got")
    fetch("https://newsapi.org/v2/top-headlines?sources="+idlistdatt+"&sortBy="+sortid+"&Api-Key=bc23d36970be6ce4d835ec5e803023514972c63a41dd9900d998b211266ee3aa")
    
    .then(res => res.json())
    .then(posts => 
        dispatch({
            type: FETCH_POSTS,
            payload: posts
        })
    
    )
  
}