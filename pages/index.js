import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import AppLayout from "../components/AppLayout"
import PostForm from "../components/post-form"
import PostCard from "../components/post-card"
import { LOAD_POST } from "../actions/post"

const Home = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post)
    //메인 페이지 로드시 LOAD_POST.request 액션 호출
    useEffect(() => {
        console.log(1)
        dispatch({
            type: LOAD_POST.request,
        })
    }, [])

    useEffect(() => {
        function onScroll() {
            /**
             * window.scrollY : 얼마나 내렸는지
             * document.documentElement.clientHeight : 화면에 보이는 길이
             * documentElement.scrollHeight : 총 길이
             * scrollY + clientHeight = scrollHeight
             */
            // console.log(
            //     window.scrollY,
            //     document.documentElement.clientHeight,
            //     document.documentElement.scrollHeight
            // )

            //스크롤을 끝까지 다 내린화면이 아닌 300px 정도 남은 상태에서 액션 호출
            if (
                window.scrollY + document.documentElement.clientHeight >
                document.documentElement.scrollHeight - 300
            ) {
                //기존 로딩시에는 요청이 가지 않는다.
                if (hasMorePosts && !loadPostsLoading) {
                    console.log(2)
                    dispatch({
                        type: LOAD_POST.request,
                    })
                }
            }
        }
        window.addEventListener("scroll", onScroll)
        return () => {
            //컴포넌트 내에서 addEventListener를 사용한 경우 addEventListener를 삭제해야 메모리 문제가 발생하지 않는다.
            window.removeEventListener("scroll", onScroll)
        }
    }, [hasMorePosts, loadPostsLoading])
    //AppLayout 안에 있는 div가 children이 된다.
    return (
        <AppLayout>
            {user && <PostForm />}
            {mainPosts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
            <div>Hello, Next!</div>
        </AppLayout>
    )
}

export default Home
