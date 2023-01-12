import AppLayout from "../components/AppLayout"
import Head from "next/head"
import { Form, Input, Checkbox, Button } from "antd"
import { useCallback, useState } from "react"
import useInput from "../hooks/use-input"
import styled from "styled-components"
import { SING_UP } from "../actions/user"
import { useDispatch, useSelector } from "react-redux"

const ErrorMessage = styled.div`
    color: red;
`

const Signup = () => {
    const [email, onChangeEmail] = useInput("")
    const [nickname, onChangeNickname] = useInput("")
    const [password, onChangePassword] = useInput("")

    const [passwordCheck, setPasswordCheck] = useState("")
    const [passwordError, setPasswordError] = useState(false)
    //패스워드 체크
    const onChangePasswordCheck = useCallback(
        (e) => {
            //input password를 password state에 저장
            setPasswordCheck(e.target.value)
            //password check Error 상태값 저장
            setPasswordError(e.target.value !== password)
        },
        //password 상태값의 변화를 저장
        [password]
    )

    const [term, setTerm] = useState("")
    const [termError, setTermError] = useState(false)
    //약관 동의
    const onChangeTerm = useCallback((e) => {
        //term 상태값 저장
        setTerm(e.target.checked)
        //onSubmit으로 setTermError(true)로 변경돼서 다시 onChangeTerm으로 약관동의를 하면  setTermError(false)으로 에러메세지를 지워준다
        setTermError(false)
    }, [])

    const dispatch = useDispatch()
    const { signUpLoading } = useSelector((state) => state.user)

    const onSubmit = useCallback(() => {
        if (password !== passwordCheck) {
            return setPasswordError(true)
        }
        if (!term) {
            return setTermError(true)
        }
        dispatch({
            type: SING_UP.request,
            data: { email, password, nickname },
        })
    }, [password, passwordCheck, term])
    return (
        <AppLayout>
            <Head>
                <title>회원가입 | NodeBird</title>
            </Head>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor="user-email">이메일</label>
                    <br />
                    <Input
                        name="user-email"
                        type="email"
                        value={email}
                        required
                        onChange={onChangeEmail}
                    />
                </div>
                <div>
                    <label htmlFor="user-nick">닉네임</label>
                    <br />
                    <Input name="user-nick" value={nickname} required onChange={onChangeNickname} />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <Input
                        name="user-password"
                        type="password"
                        value={password}
                        required
                        onChange={onChangePassword}
                    />
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호체크</label>
                    <br />
                    <Input
                        name="user-password-check"
                        type="password"
                        value={passwordCheck}
                        required
                        onChange={onChangePasswordCheck}
                    />
                    {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                </div>
                <div>
                    <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
                        Node Bird 이용약관에 동의합니까?
                        {termError && <ErrorMessage>약관에 동의 하셔야 합니다.</ErrorMessage>}
                    </Checkbox>
                </div>
                <div style={{ marginTop: 10 }}>
                    <Button type="primary" htmlType="submit">
                        가입하기
                    </Button>
                </div>
            </Form>
        </AppLayout>
    )
}

export default Signup
