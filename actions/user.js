export const LOG_IN = {
    request: "LOG_IN_REQUEST",
    success: "LOG_IN_SUCCESS",
    failure: "LOG_IN_FAILURE",
}

export const LOG_OUT = {
    request: "LOG_OUT_REQUEST",
    success: "LOG_OUT_SUCCESS",
    failure: "LOG_OUT_FAIL",
}

export const SING_UP = {
    request: "SIGN_UP_REQUEST",
    success: "SIGN_UP_SUCCESS",
    failure: "SIGN_UP_FAIL",
}

export const FOLLOW = {
    request: "FOLLOW_REQUEST",
    success: "FOLLOW_SUCCESS",
    failure: "FOLLOW_FAIL",
}

export const UNFOLLOW = {
    request: "UNFOLLOW_REQUEST",
    success: "UNFOLLOW_SUCCESS",
    failure: "UNFOLLOW_FAIL",
}
export const CHANGE_NICKNAME = {
    request: "CHANGE_NICKNAME_REQUEST",
    success: "CHANGE_NICKNAME_SUCCESS",
    failure: "CHANGE_NICKNAME_FAILURE",
}

export const POST_TO_ME = {
    add: "ADD_POST_TO_ME",
    remove: "REMOVE_POST_TO_ME",
}

export const loginRequestAction = (data) => {
    return {
        type: LOG_IN.request,
        data,
    }
}
export const successLoginAction = (data) => {
    return {
        type: LOG_IN.success,
        data,
    }
}
export const failLoginAction = (data) => {
    return {
        type: LOG_IN.failure,
        data,
    }
}

export const logoutRequestAction = (data) => {
    return {
        type: LOG_OUT.request,
    }
}
export const successLogoutAction = (data) => {
    return {
        type: LOG_OUT.success,
    }
}
export const failLogoutAction = (data) => {
    return {
        type: LOG_OUT.failure,
    }
}
