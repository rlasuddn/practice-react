import { LOG_IN, LOG_OUT, CHANGE_NICKNAME, POST_TO_ME, FOLLOW, UNFOLLOW } from "../actions/user"
import produce from "immer"

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
    Posts: [{ id: 1 }],
    Followings: [{ nickname: "부기초" }, { nickname: "Chanho Lee" }, { nickname: "neue zeal" }],
    Followers: [{ nickname: "부기초" }, { nickname: "Chanho Lee" }, { nickname: "neue zeal" }],
})

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOG_IN.request:
                draft.logInDone = false
                draft.logInLoading = true
                draft.logInError = null
                break

            case LOG_IN.success:
                draft.logInDone = true
                draft.logInLoading = false
                draft.user = dummyUser(action.data)
                break

            case LOG_IN.failure:
                draft.logInLoading = false
                draft.logInError = action.error
                break

            case LOG_OUT.request:
                draft.logOutLoading = true
                draft.logOutDone = false
                draft.logOutError = false
                break

            case LOG_OUT.success:
                draft.logOutLoading = false
                draft.logOutDone = true
                draft.user = null
                break

            case LOG_OUT.failure:
                draft.logOutLoading = false
                draft.logOutError = action.error
                break

            case CHANGE_NICKNAME.request:
                draft.changeNicknameLoading = true
                draft.changeNicknameError = null
                draft.changeNicknameDone = false
                break

            case CHANGE_NICKNAME.success:
                draft.changeNicknameLoading = false
                draft.changeNicknameDone = true
                break

            case CHANGE_NICKNAME.failure:
                draft.changeNicknameLoading = false
                draft.changeNicknameError = action.error
                break

            case POST_TO_ME.add:
                draft.user.Posts.unshift({ id: action.data })
                break
                return {
                    ...state,
                    user: {
                        ...state.user,
                        Posts: [{ id: action.data }, ...state.user.Posts],
                    },
                }
            case POST_TO_ME.remove:
                draft.user.Posts = draft.user.Posts.filter((v) => v.id !== action.data)
                break
                return {
                    ...state,
                    user: {
                        ...state.user,
                        Posts: state.user.Posts.filter((v) => v.id !== action.data),
                    },
                }
            case FOLLOW.request:
                draft.followLoading = true
                draft.followError = null
                draft.followDone = false
                break

            case FOLLOW.success:
                draft.followLoading = false
                draft.user.Followings.push({ id: action.data })
                draft.followDone = true
                break

            case FOLLOW.failure:
                draft.followLoading = false
                draft.followError = action.error
                break

            case UNFOLLOW.request:
                draft.unfollowLoading = true
                draft.unfollowError = null
                draft.unfollowDone = false
                break

            case UNFOLLOW.success:
                draft.unfollowLoading = false
                draft.user.Followings = draft.user.Followings.filter((v) => v.id !== action.data)
                draft.unfollowDone = true
                break

            case UNFOLLOW.failure:
                draft.unfollowLoading = false
                draft.unfollowError = action.error
                break
            default:
                break
        }
    })
}

export default reducer
