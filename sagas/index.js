import { all, fork } from "redux-saga/effects"
import postSaga from "./post"
import userSaga from "./user"

//call과 fork의 차이 => fork는 비동기 함수 호출, call은 동기 함수 호출

//all, call, fork, put, take과 같은 이펙트앞에는 yeild를 붙여준다.

//yield는 테스팅할때 필요한 next를 호출함으로써 특정 줄단위 테스트가 가능하다.

/*
react 데이터 흐름
1. dispatch로 액션 호출 및 데이터 전달 
2. reducer에서 해당 액션에 맞춰 데이터 변경
3. saga에서 1번에서 호출한 액션 이벤트를 대기하는 제너레이터 함수 실행(인자값에 액션과 데이터가 존재)
4. saga에서 성공 혹은 에러 액션 호출 및 데이터 전달
5. reducer에서 4.에서 변경된 액션에대한 데이터 변경 및 가공
*/
export default function* rootSaga() {
    //all은 배열안 함수를 동시 실행, fork는 비동기식 함수를 실행
    yield all([fork(userSaga), fork(postSaga)])
}
