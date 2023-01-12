import { applyMiddleware, createStore, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import { createWrapper } from "next-redux-wrapper"
import { composeWithDevTools } from "redux-devtools-extension"

//Next Redux 초기 세팅
/*
데이터들의 중앙 저장 센터 역할을 한다.
컴포넌트의 데이터 전달시 데이터값이 다르게 되면 다른페이지를 렌더링하게 된다.
이때 중앙 저장 센터에서 값을 할당해 주면 안정적으로 데이터를 받을 수 있다.

store란 state(중앙 센터) + reducer
*/

import reducer from "../reducers"
import rootSaga from "../sagas"

// const loggerMiddleware =
//     ({ dispatch, getState }) =>
//     (next) =>
//     (action) => {
//         console.log(action)
//         return next(action)
//     }

const configureStore = (context) => {
    console.log(context)
    const sagaMiddleware = createSagaMiddleware()
    const middlewares = [sagaMiddleware]
    const enhancer =
        process.env.NODE_ENV === "production"
            ? compose(applyMiddleware(...middlewares))
            : composeWithDevTools(applyMiddleware(...middlewares))
    const store = createStore(reducer, enhancer)
    store.sagaTask = sagaMiddleware.run(rootSaga)
    return store
}

const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === "development" })

export default wrapper
