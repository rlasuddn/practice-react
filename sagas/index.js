import { all, call, fork, put, take } from "redux-saga/effects"
import axios from "axios"

//call과 fork의 차이 => fork는 비동기 함수 호출, call은 동기 함수 호출

//all, call, fork, put, take과 같은 이펙트앞에는 yeild를 붙여준다.

//yield는 테스팅할때 필요한 next를 호출함으로써 특정 줄단위 테스트가 가능하다.

//logInApi는 일반 함수이다.
function logInApi(data) {
    console.log(data)
    return 1
}

//LOG_IN_REQUEST액션 자체가 매개변수에 전달된다.
//action.type = LOG_IN_REQUEST, action.data = 로그인 데이터가 들어간다.
function* logIn(action) {
    try {
        //logInApi를 실행한 결과값을 받을 수 있다.
        //두번째 인자로 logInApi함수에 로그인 데이터를 전달 => call(logInApi, action.data)
        const result = yield call(logInApi, action.data)
        //put은 dispatch 와 같은 역할을 한다.
        yield put({
            type: "LOG_IN_SUCCESS",
            data: result.data,
        })
    } catch (err) {
        //실패 값은 response.data에 담겨있다.
        yield put({
            type: "LOG_IN_FAIL",
            data: err.response.data,
        })
    }
}

function* watchLogIn() {
    // take("LOG_IN") = LOG_IN 액션이 실행될때까지 기다린다.
    // 실행되면 두번째 인자의 함수가 실행된다.
    yield take("LOG_IN_REQUEST", logIn)
}

function* watchLogOut() {
    yield take("LOG_OUT_REQUEST", logOut)
}

function addPostAPI() {
    return 1
}

function* addPost() {
    try {
        const result = yield call(addPostAPI)
        yield put({
            type: "ADD_POST_SUCCESS",
            data: result.data,
        })
    } catch (err) {
        //실패 값은 response.data에 담겨있다.
        yield put({
            type: "ADD_POST_FAIL",
            data: err.response.data,
        })
    }
}

function* watchAddPost() {
    yield take("ADD_POST_REQUEST", addPost)
}

//watchLogIn, watchLogOut 등과 같은 이벤트리스너(?)를 만들고 all에 등록하는 형식
export default function* rootSaga() {
    //all은 배열안 함수를 동시 실행, fork는 비동기식 함수를 실행
    yield all([fork(watchLogIn), fork(watchLogOut), fork(watchAddPost)])
}
