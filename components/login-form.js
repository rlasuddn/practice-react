import { Form, Input, Button } from "antd"
import { useState, useCallback } from "react"
import Link from "next/Link"
import styled from "styled-components"
import PropTypes from "prop-types"
import useInput from "../hooks/use-input"
import { useDispatch } from "react-redux"

import { loginAction } from "../reducers/user"

const ButtonWrapper = styled.div`
    margin-top: 10px;
`
const FormWrapper = styled(Form)`
    padding: 10px;
`

const LoginForm = () => {
    const dipatch = useDispatch()
    const [id, onChangeId] = useInput("")
    const [password, onChangePassword] = useInput("")

    const onSubmitForm = useCallback(() => {
        console.log(id, password)
        dipatch(loginAction({ id, password }))
    }, [id, password])

    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br />
                <Input name="user-id" value={id} onChange={onChangeId}></Input>
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
                    <Button type="primary" htmlType="submit" loading={false}>
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
