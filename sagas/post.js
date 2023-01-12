import { all, fork, delay, put, throttle, takeLatest } from "redux-saga/effects"
import { ADD_POST, ADD_COMMENT } from "../actions/post"

function addPostAPI() {
    return 1
}

function* addPost(action) {
    try {
        console.log("saga post")
        console.log(action)
        // const result = yield call(addPostAPI)
        yield delay(1000)
        yield put({
            type: ADD_POST.success,
            data: action.data,
        })
    } catch (err) {
        //실패 값은 response.data에 담겨있다.
        yield put({
            type: ADD_POST.failure,
            error: err.response.data,
        })
    }
}

//yield throttle은 요청을 초단위로 제한을 둬서 요청이 온 후 2000초 동안은 요청을 막는다.
function* watchAddPost() {
    yield takeLatest(ADD_POST.request, addPost)
}

function addCommentAPI() {
    return 1
}

function* addComment(action) {
    try {
        // const result = yield call(addCommentAPI)
        yield delay(2000)
        yield put({
            type: ADD_COMMENT.request,
            data: action.data,
        })
    } catch (err) {
        //실패 값은 response.data에 담겨있다.
        yield put({
            type: ADD_COMMENT.failure,
            error: err.response.data,
        })
    }
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT.request, addComment)
}

export default function* postSaga() {
    yield all([fork(watchAddPost), fork(watchAddComment)])
}
