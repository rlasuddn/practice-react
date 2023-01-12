import PropTypes from "prop-types"
import { Form, Input, Button } from "antd"
import Link from "next/link"
import styled from "styled-components"

import useInput from "../hooks/use-input"
import { useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"

import { LOG_IN } from "../actions/user"

const ButtonWrapper = styled.div`
    margin-top: 10px;
`
const FormWrapper = styled(Form)`
    padding: 10px;
`

/*
로그인폼에서 로그인 실행 상황
1. id, password 입력 후 로그인 버튼 클릭
2. onSubmitForm -> reducer에 loginRequestAction액션 실행
3. type: "LOG_IN_REQUEST" 이므로 -> sagas에 watchLogI 제너레이터 함수 실행 -> logIn 함수 실행,
동시에 reducer에 있는 switch case LOG_IN_REQUEST: 가 동시에 실행(동시는 아니고 순서가 따로 있음.)
4. 성공하면 yield put({type: "LOG_IN_SUCCESS",data: action.data,})가 실행되고 switch case LOG_IN_SUCCESS: 실행
동시에 user: { ...action.data, nickname: "woo" }, 데이터가 들어가고 isLoggedIn: true로 변경
5. AppLayOut에서 <LoginForm />이 아닌 <UserProfile />로 변경
*/

const LoginForm = () => {
    const dipatch = useDispatch()
    const { logInLoading } = useSelector((state) => state.user)

    const [email, onChangeEmail] = useInput("")
    const [password, onChangePassword] = useInput("")

    const onSubmitForm = useCallback(() => {
        dipatch({
            type: LOG_IN.request,
            data: { email, password },
        })
    }, [email, password])

    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-email">아이디</label>
                <br />
                <Input
                    name="user-email"
                    tyep="email"
                    value={email}
                    onChange={onChangeEmail}
                ></Input>
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input
                    name="user-password"
                    type="password"
                    required
                    value={password}
                    onChange={onChangePassword}
                ></Input>
            </div>
            <div style={{ marginTop: 10 }}>
                <ButtonWrapper>
                    <Button type="primary" htmlType="submit" loading={logInLoading}>
                        로그인
                    </Button>
                </ButtonWrapper>
                <Link href="/signup">
                    <a>회원가입</a>
                </Link>
            </div>
        </FormWrapper>
    )
}

export default LoginForm
