import { HYDRATE } from "next-redux-wrapper"

import user from "./user"
import post from "./post"
import { combineReducers } from "redux"

//액션
const CHANGE_NICKNAME = {
    tyep: "CHANGE_NICKNAME",
    data: "wooyoung",
}

//동적 액션 생성기
const changeNickName = (data) => {
    return {
        tyep: "CHANGE_NICKNAME",
        data,
    }
}

//reducer(이전상태, 액션) => 다음상태 로 이루어진 함수
//메모리 이슈로 인해 변하지 않는 값은 ...연산자로 참조해주고 변경되는 값은 생성한다.
//return {}로 인해 객체는 새로 생성된다(불변성을 지키기 위해)
//이전 상태와 return된 현재 상태의 히스토리 확인을 위해 새로 생성한다.

const rootReducerEx = combineReducers({
    //reducer 합치기
    user,
    post,
})

//SSR을 사용하기 위해 HYDRATE를 적용 => index reducer를 추가한 형식
//기본 state를 comine에서 가져오기때문에 따로 생성하지 않는다.
const rootReducer = combineReducers({
    //reducer 합치기
    index: (state = {}, action) => {
        console.log("reducer ", action)
        switch (action.type) {
            case HYDRATE:
                return { ...state, ...action.payload }

            default:
                return state
        }
    },
    user,
    post,
})

export default rootReducer
