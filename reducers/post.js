import { ADD_POST, ADD_COMMENT, REMOVE_POST, LOAD_POST } from "../actions/post"
import shortId from "shortid"
import produce from "immer"

//npm i faker@5 -D
import faker from "faker"

export const initialState = {
    mainPosts: [],
    imagePaths: [],
    hasMorePosts: true,
    loadPostsLoading: false,
    loadPostsDone: false,
    loadPostsError: null,
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

export const generateDummyPost = (number) =>
    //faker를 이용한 dummy data 만들기
    Array(number)
        .fill(number)
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
            case LOAD_POST.request:
                draft.loadPostsLoading = true
                draft.loadPostsDone = false
                draft.loadPostsError = null
                break
            case LOAD_POST.success:
                draft.loadPostsLoading = false
                draft.loadPostsDone = true
                draft.mainPosts = action.data.concat(draft.mainPosts) //action.data 새로운 포스트에 draft.mainPosts 기존 포스트들 합치기
                draft.hasMorePosts = draft.mainPosts.length < 50 //포스트가 50개 보다 적으면 true 많으면 false 포스트를 50개로 제한 => 더이상 포스트를 가져오지 않는다.
                break
            case LOAD_POST.failure:
                draft.loadPostsLoading = false
                draft.loadPostsError = action.error
                break
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
