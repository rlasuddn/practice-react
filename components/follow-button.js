import { Button } from "antd"
import PropTypes from "prop-types"
import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FOLLOW, UNFOLLOW } from "../actions/user"

const FollowButton = ({ post }) => {
    const me = useSelector((state) => state.user.user)
    const { followLoading, unfollowLoading } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const isFollowing = me?.Followings.find((v) => v.id === post.User.id) //내 팔로잉 리스트 중 포스트 작성자 존재 여부

    const onClickButton = useCallback(() => {
        if (isFollowing) {
            dispatch({
                type: UNFOLLOW.request,
                data: post.User.id, //포스트 작성자 아이디
            })
        } else {
            dispatch({
                type: FOLLOW.request,
                data: post.User.id,
            })
        }
    }, [isFollowing])
    return (
        <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
            {isFollowing ? "언팔로우" : "팔로잉"}
        </Button>
    )
}

FollowButton.propTypes = {
    post: PropTypes.object.isRequired,
}
export default FollowButton
