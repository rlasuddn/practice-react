import { Avatar, Card, Button } from "antd";
import styled from "styled-components";
import { useCallback } from "react";

const ButtonWrapper = styled(Button)`
    margin-left: 30px;
    margin-top: 10px;
`;
const UserProfile = ({ setIsLoggedIn }) => {
    const onLogout = useCallback(() => {
        setIsLoggedIn(false);
    });
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
    );
};

export default UserProfile;
