import axios from "axios";

// API to Fetch All Posts
export const getPosts = (callbackSuccess, callbackFailure) => {
    axios.get('https://www.reddit.com/.json')
    .then( resp => callbackSuccess(resp))
    .catch( ex => callbackFailure(ex))
}

// API to Fetch Post Detail
export const getPostDetail = (link, callbackSuccess, callbackFailure) => {
    axios.get(`https://www.reddit.com${link}.json`)
    .then( resp => callbackSuccess(resp))
    .catch( ex => callbackFailure(ex))
}