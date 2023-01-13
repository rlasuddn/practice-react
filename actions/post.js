export const ADD_POST = {
    request: "ADD_POST_REQUEST",
    success: "ADD_POST_SUCCESS",
    failure: "ADD_POST_FAIL",
}

export const REMOVE_POST = {
    request: "REMOVE_POST_REQUEST",
    success: "REMOVE_POST_SUCCESS",
    failure: "REMOVE_POST_FAIL",
}

export const ADD_COMMENT = {
    request: "ADD_COMMENT_REQUEST",
    success: "ADD_COMMENT_SUCCESS",
    failure: "ADD_COMMENT_FAIL",
}

export const LOAD_POST = {
    request: "LOAD_POST_REQUEST",
    success: "LOAD_POST_SUCCESS",
    failure: "LOAD_POST_FAIL",
}

export const addPost = (data) => ({
    type: ADD_POST.request,
    data,
})

export const addComment = (data) => ({
    type: ADD_COMMENT.request,
    data,
})
