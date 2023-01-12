import { all, fork, put, takeLatest, delay } from "redux-saga/effects"
import { LOG_IN, LOG_OUT } from "../actions/user"

//logInApi는 일반 함수이다.
function logInApi(data) {
    console.log(data)
    return 1
}

//LOG_IN_REQUEST액션 자체가 매개변수에 전달된다.
//action.type = LOG_IN_REQUEST, action.data = 로그인 데이터가 들어간다.
function* logIn(action) {
    try {
        /*
        logInApi를 실행한 결과값을 받을 수 있다.
        두번째 인자로 logInApi함수에 로그인 데이터를 전달 => call(logInApi, action.data)
        const result = yield call(logInApi, action.data)
        */
        console.log("saga logIn")
        console.log(action)

        yield delay(1000)
        //put은 dispatch 와 같은 역할을 한다.
        yield put({
            type: LOG_IN.success,
            data: action.data,
        })
    } catch (err) {
        //실패 값은 response.data에 담겨있다.
        yield put({
            type: LOG_IN.failure,
            error: err.response.data,
        })
    }
}
function* logOut(action) {
    try {
        yield delay(1000)
        yield put({
            type: LOG_OUT.success,
            data: action.data,
        })
    } catch (err) {
        yield put({
            type: LOG_OUT.failure,
            error: action.data,
        })
    }
}

/*
yield take는 일회용이다. 한번 사용하게 되면 더이상 이벤트를 받지 않는다.
while문을 사용함으로써 이벤트를 받고 그다음에도 이벤트를 받을 수 있다. =>  takeEvery이펙터로 같은 효과를 낼 수 있다.
takeEvery는 같은 이벤트가 여러번 올 경우 그 이벤트들을 다 처리하는데 takeLatest는 여러번 온 이벤트는 무시하고 마지막 이벤트만 수행한다. => 게시글 작성 2번 클릭 => 첫번째 게시글 작성 이벤트 무시 => 마지막 이벤트만 실행.
takeLatest는 마지막 응답을 실행 할 뿐 요청을 무시하진 않아서 같은 데이터가 여러개 왔는지 검사를 해야한다.
*/
function* watchLogIn() {
    // take("LOG_IN") = LOG_IN 액션이 실행될때까지 기다린다.
    // 실행되면 두번째 인자의 함수가 실행된다.
    yield takeLatest(LOG_IN.request, logIn)
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT.request, logOut)
}

//watchLogIn, watchLogOut 등과 같은 이벤트리스너(?)를 만들고 all에 등록하는 형식
export default function* userSaga() {
    yield all([fork(watchLogIn), fork(watchLogOut)])
}
