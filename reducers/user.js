import { LOG_IN, LOG_OUT, CHANGE_NICKNAME } from "../actions/user"

//기본 state
export const initialState = {
    followLoading: false, // 팔로우 시도중
    followDone: false,
    followError: null,
    unfollowLoading: false, // 언팔로우 시도중
    unfollowDone: false,
    unfollowError: null,
    logInLoading: false, // 로그인 시도중
    logInDone: false,
    logInError: null,
    logOutLoading: false, // 로그아웃 시도중
    logOutDone: false,
    logOutError: null,
    signUpLoading: false, // 회원가입 시도중
    signUpDone: false,
    signUpError: null,
    changeNicknameLoading: false, // 닉네임 변경 시도중
    changeNicknameDone: false,
    changeNicknameError: null,
    user: null,
    signUpData: {},
    loginData: {},
}

//data에는 email, password가 존재
const dummyUser = (data) => ({
    ...data,
    nickname: "woo",
    id: 1,
    Posts: [],
    Followings: [],
    Followers: [],
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN.request:
            return {
                ...state,
                logInDone: false,
                logInLoading: true,
                logInError: null,
            }
        case LOG_IN.success:
            return {
                ...state,
                logInDone: true,
                logInLoading: false,
                user: dummyUser(action.data),
            }
        case LOG_IN.failure:
            return {
                ...state,
                logInLoading: false,
                logInError: action.error,
                user: action.data,
            }

        case LOG_OUT.request:
            return {
                ...state,
                logOutLoading: true,
                logOutDone: false,
                logOutError: false,
                user: null,
            }
        case LOG_OUT.success:
            return {
                ...state,
                logOutLoading: false,
                logOutDone: true,
                user: null,
            }
        case LOG_OUT.failure:
            return {
                ...state,
                logOutLoading: false,
                logOutError: action.error,
                user: null,
            }
        case CHANGE_NICKNAME.request:
            return {
                ...state,
                changeNicknameLoading: true,
                changeNicknameError: null,
                changeNicknameDone: false,
            }
        case CHANGE_NICKNAME.success:
            return {
                changeNicknameLoading: false,
                changeNicknameDone: true,
            }
        case CHANGE_NICKNAME.failure:
            return {
                changeNicknameLoading: false,
                changeNicknameError: action.error,
            }
        default:
            return state
    }
}

export default reducer
