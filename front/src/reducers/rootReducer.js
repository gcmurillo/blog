const initState = {
    posts: [],
    users: [],
    new_post_data: {
        title: "",
        author: "",
        body: ""
    },
    getting_posts: false,
    getting_posts_error: false,
    getting_posts_success: false,
    posting_post: false,
    posting_post_error: false,
    posting_post_success: false,
}

const rootReducer = (state = initState, action) => {
    switch (action.type)  {
        case 'GET_POSTS':
            return {
                ...state,
                getting_posts: true,
                getting_posts_error: false,
                getting_posts_success: false
            }
        case 'GET_POSTS_ERROR':
            return {
                ...state,
                getting_post: false,
                getting_post_error: true,
                getting_post_success: false
            }
        case 'GET_POSTS_SUCCESS':
            return {
                ...state,
                getting_post: false,
                getting_post_error: false,
                getting_post_success: true,
                posts: action.data
            }
        case 'GET_USERS':
            return {
                ...state,
                users: action.data
            }
        case 'CHANGE_DATA_NEW':
            let assign = {[action.key]: action.value}
            let new_data = Object.assign({}, state.new_post_data, assign);
            return {
                ...state,
                new_post_data: new_data
            }
        case 'CHANGE_AUTHOR':
            let new_author = Object.assign({}, state.new_post_data, {author: +action.data});
            return {
                ...state,
                new_post_data: new_author
            }
        case 'POSTING_NEW_POST':
            return {
                ...state,
                posting_post: true
            }
        case 'POSTING_NEW_POST_SUCCESS':
            return {
                ...state,
                posting_post: false,
                posting_post_success: true,
                posting_post_error: false
            }
        case 'POSTING_NEW_POST_ERROR':
            return {
                ...state, 
                posting_post: false,
                posting_post_success: false,
                posting_post_error: false,
            }
        default:
            return state;
    } 
}

export default rootReducer;