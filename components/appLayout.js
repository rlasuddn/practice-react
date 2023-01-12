import PropTypes from "prop-types"
import Link from "next/link"
import { Menu, Input, Row, Col } from "antd"
import { useState } from "react"
import { useSelector } from "react-redux"

import UserProfile from "./user-profile"
import LoginForm from "./login-form"

import styled from "styled-components"

//styeled 컴포넌트 생성으로 리렌더링 최적화
const SerchInput = styled(Input.Search)`
    vertical-align: middle;
`
const items = [
    {
        label: (
            <Link href="/">
                <a>노드버드</a>
            </Link>
        ),
    },
    {
        key: "home",
        label: (
            <Link href="/profile">
                <a>프로필</a>
            </Link>
        ),
        key: "profile",
    },
    {
        label: (
            <Link href="/signup">
                <a>회원가입</a>
            </Link>
        ),
        key: "signup",
    },
    { label: <SerchInput enterButton style={{ verticalAlign: "middle" }} />, key: "search" },
]
//특정 컴포넌트끼리 공통적인 부분 처리 파일
const AppLayout = ({ children }) => {
    const user = useSelector((state) => state.user.user)
    //Row: 가로 Col 세로
    //xs는 모바일 24칸 = 100% 어느정도 화면비율이 가면 6칸 = 25% 만 사용하도록 설정
    //xs md 합쳐서 24이하면 가로로 정렬되고 24이상이면 그 다음 줄로 넘어간다.
    //gutter 컬럼간의 간격 조정
    //target blank는 보안위협이 있으므로 rel="noreferrer noopener"를 상시 같이 적어준다.
    return (
        <div>
            <Menu mode="horizontal" items={items}></Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {user ? <UserProfile /> : <LoginForm />}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href="https://github.com/rlasuddn" target="_balnk" rel="noreferrer noopener">
                        Made by woo
                    </a>
                </Col>
            </Row>
        </div>
    )
}

//ProTypes.node는 컴포넌트에서 return 하는 모든 것을 말한다.
AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
}
export default AppLayout
