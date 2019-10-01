import axios from 'axios';
import { 
    baseURL,
    usersEndpoint,
    postsEndpoint 
} from '../config/config';


export const requestGetPosts = () => {
    return (dispatch) => {
        dispatch(getPosts())
        return axios.get(baseURL + postsEndpoint).then(
            (res) => {
                console.log('response', res)
                dispatch(getPostsSuccess(res));
            }
        )
        .catch(
            (err) => {
                console.log('error', err);
                dispatch(getPostsError());
            }
        )
    }
}

export const requestGetUsers = () => {
    return (dispatch) => {
        return axios.get(baseURL + usersEndpoint).then(
            (res) => {
                dispatch(getUsersSuccess(res));
            }
        )
    }
}

export const requestPostPost = (data) => {
    return (dispatch) => {
        dispatch(postingNewPost())
        return axios.post(baseURL + postsEndpoint, data).then(
            (res) => {
                dispatch(postingNewPostSuccess())
            }
        ).then(
            dispatch(requestGetPosts())
        ).catch(
            (err) => {
                dispatch(postingNewPostError())
            }
        )
    }
}


export const getPosts = () => {
    return {
        type: 'GET_POSTS'
    }
}

export const getPostsSuccess = (res) => {
    return {
        type: 'GET_POSTS_SUCCESS',
        data: res.data
    }
}

export const getPostsError = () => {
    return {
        type: 'GET_POSTS_ERROR'
    }
}

export const getUsersSuccess = (res) => {
    return {
        type: 'GET_USERS',
        data: res.data
    }
}

export const changeDataNew = (key, value) => {
    return {
        type: 'CHANGE_DATA_NEW',
        key: key,
        value: value
    }
}

export const ChangeAuthorNew = (value) => {
    return {
        type: 'CHANGE_AUTHOR',
        data: value
    }
}

export const postingNewPost = () => {
    return {
        type: 'POSTING_NEW_POST'
    }
}

export const postingNewPostSuccess = () => {
    return {
        type: 'POSTING_NEW_POST_SUCCESS'
    }
}

export const postingNewPostError = () => {
    return {
        type: 'POSTING_NEW_POST_ERROR'
    }
}