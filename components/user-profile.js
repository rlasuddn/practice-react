import { Avatar, Card, Button } from "antd"
import styled from "styled-components"
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"

const ButtonWrapper = styled(Button)`
    margin-left: 30px;
    margin-top: 10px;
`
const UserProfile = () => {
    const { user, logOutLoading } = useSelector((state) => state.user)

    const dispatch = useDispatch()
    const onLogout = useCallback(() => {
        dispatch({})
    }, [])
    return (
        <Card
            actions={[
                <div key="twit">
                    짹짹
                    <br />
                    {user.Posts.length}
                </div>,
                <div key="followings">
                    팔로잉
                    {/* {user.Followings.length} */}
                    <br />0
                </div>,
                <div key="followers">
                    팔로워
                    {/* {user.Follwers.length} */}
                    <br />0
                </div>,
            ]}
        >
            <Card.Meta avatar={<Avatar>{user.nickname}</Avatar>} title={user.nickname} />
            <ButtonWrapper onClick={onLogout} loading={logOutLoading}>
                로그아웃
            </ButtonWrapper>
        </Card>
    )
}

export default UserProfile
