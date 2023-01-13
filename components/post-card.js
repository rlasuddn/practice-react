import { useState, useCallback } from "react"
import { Card, Button, Avatar, Popover, List, Comment } from "antd"
import PropTypes from "prop-types"
import {
    RetweetOutlined,
    HeartTwoTone,
    HeartOutlined,
    MessageOutlined,
    EllipsisOutlined,
} from "@ant-design/icons"
import styled from "styled-components"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"

import PostImages from "./post-images"
import CommentForm from "./comment-form"
import PostCardContent from "./post-card-content"
import { REMOVE_POST } from "../actions/post"

const PostCard = ({ post }) => {
    const id = useSelector((state) => state.user.user?.id)
    const removePostLoading = useSelector((state) => state.post.removePostLoading)
    const [liked, setLiked] = useState(false)
    const [commentFormOpened, setCommentFormOpened] = useState(false)
    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev)
    }, [])

    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev)
    }, [])

    const dispatch = useDispatch()
    const onRemovePost = useCallback(() => {
        dispatch({
            type: REMOVE_POST.request,
            data: post.id,
        })
    }, [])
    return (
        <>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet" />,
                    liked ? (
                        <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
                    ) : (
                        <HeartOutlined key="heart" onClick={onToggleLike} />
                    ),

                    <MessageOutlined key="comment " onClick={onToggleComment} />,
                    <Popover
                        key="ellipsis"
                        content={
                            <Button.Group>
                                {id && post.User.id === id ? (
                                    <>
                                        <Button>수정</Button>
                                        <Button
                                            type="danger"
                                            loading={removePostLoading}
                                            onClick={onRemovePost}
                                        >
                                            삭제
                                        </Button>
                                    </>
                                ) : (
                                    <Button>신고</Button>
                                )}
                            </Button.Group>
                        }
                    >
                        <EllipsisOutlined />
                    </Popover>,
                ]}
            >
                <Card.Meta
                    avatat={<Avatar>{post.User.nickname}</Avatar>}
                    title={post.User.nickname}
                    description={<PostCardContent postData={post.content} />}
                />
            </Card>
            {commentFormOpened && (
                <div>
                    <CommentForm post={post} />
                    <List
                        header={`${post.Comments.length} 댓글개수`}
                        itemLayout="horizontal"
                        dataSource={post.Comments}
                        renderItem={(item) => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={
                                        <Link
                                            href={{
                                                pathname: "/user",
                                                query: { id: item.User.id },
                                            }}
                                            as={`/user/${item.User.id}`}
                                        >
                                            <a>
                                                <Avatar>{item.User.nickname[0]}</Avatar>
                                            </a>
                                        </Link>
                                    }
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </div>
            )}
        </>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.any),
        Images: PropTypes.arrayOf(PropTypes.any),
    }),
}

export default PostCard
