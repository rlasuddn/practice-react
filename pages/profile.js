import AppLayout from "../components/appLayout";
import Head from "next/head";

import NicknameEditForm from "../components/nickname-edit-form";
import FollowingList from "../components/following-list";
import FollowerList from "../components/follower-list";

const Profile = () => {
    const followingList = [{ nickname: "a" }, { nickname: "b" }, { nickname: "c" }];
    const follwerList = [{ nickname: "a" }, { nickname: "b" }, { nickname: "c" }];
    return (
        <>
            <Head>
                <title>내 프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowingList header="팔로잉 목록" data={followingList} />
                <FollowerList header="팔로워 목록" data={follwerList} />
            </AppLayout>
        </>
    );
};

export default Profile;
