import { useState, useCallback } from "react";

//함수안에서 사용하지 않는 state 값은 배열에 작성해줄 필요 없다.
//상태값이 바뀌는 것을 인지하려면 배열에 상태값을 넣어준다.
//상태값이 바뀌면 함수는 실행된다.

export default (init = null) => {
    const [value, setValue] = useState(init);
    const handler = useCallback((e) => {
        setValue(e.target.value);
    }, []);
    return [value, handler];
};
