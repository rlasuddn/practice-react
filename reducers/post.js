import { ADD_POST, ADD_COMMENT } from "../actions/post"

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
                    src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726",
                },
                {
                    src: "https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg",
                },
                {
                    src: "https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg",
                },
            ],
            Comments: [
                {
                    User: {
                        nickname: "nero",
                    },
                    content: "우와 개정판이 나왔군요~",
                },
                {
                    User: {
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
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
}

const dummyPost = {
    id: 2,
    content: "#리액트 #리듀스#자바스크립트 #맞팔.",
    User: {
        id: 1,
        nickname: "제로초",
    },
    Images: [],
    Comments: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST.request:
            return {
                ...state,
                addPostLoading: true,
                addPostDone: false,
                addPostError: null,
            }
        case ADD_POST.success:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                addPostLoading: false,
                addPostDone: true,
            }
        case ADD_POST.failure:
            return {
                ...state,
                addPostLoading: false,
                addPostError: action.error,
            }
        case ADD_COMMENT.request:
            return {
                ...state,
                addCommentLoading: true,
                addCommentDone: false,
                addCommentError: null,
            }

        case ADD_COMMENT.success:
            return {
                ...state,
                addCommentLoading: false,
                addCommentDone: true,
            }
        case ADD_COMMENT.failure:
            return {
                ...state,
                addCommentLoading: false,
                addCommentError: action.error,
            }
        default:
            return state
    }
}

export default reducer
