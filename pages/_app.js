import "antd/dist/antd.css";
import propTypes from "prop-types";
import Head from "next/head";

import wrapper from "../store/configure-store";
//모든 페이지의 공통 옵션 처리 파일
//각 컴포넌트의 return 부분이 Component로 들어가게 된다.
const NodeBird = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>NodeBird</title>
            </Head>
            <Component />
        </>
    );
};

NodeBird.propTypes = {
    Component: propTypes.elementType.isRequired,
};

//Provide로 감싸주는 역할
export default wrapper.withRedux(NodeBird);
