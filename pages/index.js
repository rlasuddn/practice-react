import { useSelector } from "react-redux"
import AppLayout from "../components/AppLayout"
import PostForm from "../components/post-form"
import PostCard from "../components/post-card"

const Home = () => {
    //AppLayout 안에 있는 div가 children이 된다.
    const { user } = useSelector((state) => state.user)
    const mainPosts = useSelector((state) => state.post.mainPosts)
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
