import { all, fork, delay, put, throttle, takeLatest } from "redux-saga/effects"
import shortid from "shortid"
import { ADD_POST, ADD_COMMENT, REMOVE_POST, LOAD_POST } from "../actions/post"
import { POST_TO_ME } from "../actions/user"
import { generateDummyPost } from "../reducers/post"

function* loadPosts(action) {
    try {
        console.log("saga loadPosts ", action)

        yield delay(1000)
        yield put({
            type: LOAD_POST.success,
            data: generateDummyPost(10), //reducer에서 만들어둔 더미포스트 생성
        })
    } catch (err) {
        //실패 값은 response.data에 담겨있다.
        yield put({
            type: LOAD_POST.failure,
            error: err.response.data,
        })
    }
}

function* watchLoadPosts() {
    yield takeLatest(LOAD_POST.request, loadPosts)
}

function addPostAPI() {
    return 1
}

function* addPost(action) {
    try {
        console.log("saga post")
        console.log(action)
        // const result = yield call(addPostAPI)
        const id = shortid.generate()

        //액션이 reducer에 데이터를 동시에 변경해야 한다면 추가로 액션을 호출한다.
        yield delay(1000)
        //post reducer 데이터 변경
        yield put({
            type: ADD_POST.success,
            data: {
                id,
                content: action.data,
            },
        })
        //user reducer 데이터 변경
        yield put({
            type: POST_TO_ME.add,
            data: id,
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

function* removePost(action) {
    try {
        console.log("saga remove post")
        console.log(action)
        // const result = yield call(addPostAPI)

        //액션이 reducer에 데이터를 동시에 변경해야 한다면 추가로 액션을 호출한다.
        yield delay(1000)
        //post reducer 데이터 변경
        yield put({
            type: REMOVE_POST.success,
            data: action.data,
        })
        //user reducer 데이터 변경
        yield put({
            type: POST_TO_ME.remove,
            data: action.data,
        })
    } catch (err) {
        //실패 값은 response.data에 담겨있다.
        yield put({
            type: REMOVE_POST.failure,
            error: err.response.data,
        })
    }
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST.request, removePost)
}

function addCommentAPI() {
    return 1
}

function* addComment(action) {
    try {
        // const result = yield call(addCommentAPI)
        yield delay(2000)
        yield put({
            type: ADD_COMMENT.success,
            data: action.data,
        })
    } catch (err) {
        //실패 값은 response.data에 담겨있다.
        console.log(err)
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
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchRemovePost),
        fork(watchLoadPosts),
    ])
}
