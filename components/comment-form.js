import PropTypes from "prop-types"
import { Button, Form, Input } from "antd"

import { useState, useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { ADD_COMMENT } from "../actions/post"

const CommentForm = ({ post }) => {
    const dispatch = useDispatch()
    const [commentText, setCommentText] = useState("")

    const id = useSelector((state) => state.user.user?.id)
    const addCommentDone = useSelector((state) => state.post.addCommentDone)

    //성공적으로 댓글 작성 시 빈칸으로 변경
    useEffect(() => {
        if (addCommentDone) {
            setCommentText("")
        }
    }, [addCommentDone])

    const onSubmitComment = useCallback(() => {
        dispatch({
            type: ADD_COMMENT.request,
            data: { content: commentText, postId: post.id, userId: id },
        })
    }, [commentText, id])

    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value)
    }, [])

    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item style={{ position: "relative", margin: 0 }}>
                <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
                <Button
                    style={{ position: "absolute", right: 0, bottom: -40 }}
                    type="primary"
                    htmlType="submit"
                >
                    삐약
                </Button>
            </Form.Item>
        </Form>
    )
}

export default CommentForm
