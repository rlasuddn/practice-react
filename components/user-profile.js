import { Avatar, Card, Button } from "antd"
import styled from "styled-components"
import { useCallback } from "react"
import { useDispatch } from "react-redux"

import { logoutAction } from "../reducers/user"

const ButtonWrapper = styled(Button)`
    margin-left: 30px;
    margin-top: 10px;
`
const UserProfile = () => {
    const dispatch = useDispatch()
    const onLogout = useCallback(() => {
        dispatch(logoutAction())
    })
    return (
        <Card
            actions={[
                <div key="twit">
                    짹짹
                    <br />0
                </div>,
                <div key="followings">
                    팔로잉
                    <br />0
                </div>,
                <div key="followers">
                    팔로워
                    <br />0
                </div>,
            ]}
        >
            <Card.Meta avatar={<Avatar>Woo</Avatar>} title="woo" />
            <ButtonWrapper onClick={onLogout}>로그아웃</ButtonWrapper>
        </Card>
    )
}

export default UserProfile
