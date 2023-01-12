import AppLayout from "../components/appLayout"
import Head from "next/head"

import NicknameEditForm from "../components/nickname-edit-form"
import FollowingList from "../components/following-list"
import FollowerList from "../components/follower-list"
import { useSelector } from "react-redux"

const Profile = () => {
    const { user } = useSelector((state) => state.user)
    return (
        <>
            <Head>
                <title>내 프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowingList header="팔로잉 목록" data={user.FollowingList} />
                <FollowerList header="팔로워 목록" data={user.FollowerList} />
            </AppLayout>
        </>
    )
}

export default Profile
