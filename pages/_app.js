import "antd/dist/antd.css";
import propTypes from "prop-types";
import Head from "next/head";

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

export default NodeBird;
