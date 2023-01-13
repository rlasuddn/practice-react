import { ADD_POST, ADD_COMMENT, REMOVE_POST } from "../actions/post"
import shortId from "shortid"
import produce from "immer"

//npm i faker@5 -D
import faker from "faker"

export const initialState = {
    mainPosts: [
        {
            id: 1,
            User: {
                id: 1,
                nickname: "woo",
            },
            content: "첫 번째 게시글",
            Images: [
                {
                    id: shortId.generate(),
                    src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726",
                },
                {
                    id: shortId.generate(),
                    src: "https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg",
                },
                {
                    id: shortId.generate(),
                    src: "https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg",
                },
            ],
            Comments: [
                {
                    id: shortId.generate(),
                    User: {
                        id: shortId.generate(),
                        nickname: "nero",
                    },
                    content: "우와 개정판이 나왔군요~",
                },
                {
                    id: shortId.generate(),
                    User: {
                        id: shortId.generate(),
                        nickname: "hero",
                    },
                    content: "얼른 사고싶어요~",
                },
            ],
        },
    ],
    imagePaths: [],
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    removePostLoading: false,
    removePostDone: false,
    removePostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
}

//faker를 이용한 dummy data 만들기
initialState.mainPosts = initialState.mainPosts.concat(
    Array(20)
        .fill()
        .map(() => ({
            id: shortId.generate(),
            User: {
                id: shortId.generate(),
                nickname: faker.name.findName(),
            },
            content: faker.lorem.paragraph(),
            Images: [{ src: faker.image.image() }],
            Comments: [
                {
                    User: {
                        id: shortId.generate(),
                        nickname: faker.name.findName(),
                    },
                    content: faker.lorem.sentence(),
                },
            ],
        }))
)

const dummyPost = (data) => ({
    //임의 Id 생성 라이브러리
    id: data.id,
    content: data.content,
    User: {
        id: 1,
        nickname: "woo",
    },
    Images: [],
    Comments: [],
})

const dummyComment = (data) => ({
    //임의 Id 생성 라이브러리
    id: shortId.generate(),
    content: data,
    User: {
        id: 1,
        nickname: "woo",
    },
})
const reducer = (state = initialState, action) => {
    /**
      state의 불변성을 immer가 지켜준다.
      단 state가 아닌 draft로 조작 하여야 한다.
      기본 틀 return produce(state, (draft) => {}
    */

    return produce(state, (draft) => {
        switch (action.type) {
            case ADD_POST.request:
                draft.addPostLoading = true
                draft.addPostDone = false
                draft.addPostError = null
                break
                //immer 적용 전
                return {
                    ...state,
                    addPostLoading: true,
                    addPostDone: false,
                    addPostError: null,
                }
            case ADD_POST.success:
                draft.addPostLoading = false
                draft.addPostDone = true
                draft.mainPosts.unshift(dummyPost(action.data))
                break
                //immer 적용 전
                return {
                    ...state,
                    mainPosts: [dummyPost(action.data), ...state.mainPosts],
                    addPostLoading: false,
                    addPostDone: true,
                }
            case ADD_POST.failure:
                draft.addPostLoading = false
                draft.addPostError = action.error
                break
                //immer 적용 전
                return {
                    ...state,
                    addPostLoading: false,
                    addPostError: action.error,
                }
            case REMOVE_POST.request:
                draft.removePostLoading = true
                draft.removePostDone = false
                draft.removePostError = null
                break
                //immer 적용 전
                return {
                    ...state,
                    removePostLoading: true,
                    removePostDone: false,
                    removePostError: null,
                }
            case REMOVE_POST.success:
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data)
                draft.removePostLoading = false
                draft.removePostDone = true
                break
                //immer 적용 전
                return {
                    ...state,
                    mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
                    removePostLoading: false,
                    removePostDone: true,
                }
            case REMOVE_POST.failure:
                draft.removePostLoading = false
                draft.removePostError = action.error
                break
                //immer 적용 전
                return {
                    ...state,
                    removePostLoading: false,
                    removePostError: action.error,
                }
            case ADD_COMMENT.request:
                draft.addCommentLoading = true
                draft.addCommentDone = false
                draft.addCommentError = null
                break
                //immer 적용 전
                return {
                    ...state,
                    addCommentLoading: true,
                    addCommentDone: false,
                    addCommentError: null,
                }

            case ADD_COMMENT.success: {
                const post = draft.mainPosts.find((v) => v.id === action.data.postId)
                post.Comments.unshift(dummyComment(action.data.content))
                draft.addCommentLoading = false
                draft.addCommentDone = true
                break
                //immer 적용 전
                //불면성을 위해 변하지 않는 데이터는 참조해주고 바뀌는 데이터는 새로 만들어주기 위해 이러한 작업이 필요하다.
                const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId)
                //const post = { ...state.mainPosts[postIndex] }
                post.Comments = [dummyComment(action.data.content), ...post.Comments] //해당 게시물의 댓글을 얕은 복사
                const mainPosts = [...state.mainPosts]
                mainPosts[postIndex] = post
                return {
                    ...state,
                    mainPosts,
                    addCommentLoading: false,
                    addCommentDone: true,
                }
            }

            case ADD_COMMENT.failure:
                draft.addCommentLoading = false
                draft.addCommentError = action.error
                break
                return {
                    ...state,
                    addCommentLoading: false,
                    addCommentError: action.error,
                }
            default:
                break
        }
    })
}

export default reducer
