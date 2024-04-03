import { useRef, useEffect } from 'react';

//const [isRunning, setIsRunning] = useState(true);
//useInterval(() => {
//  console.log('hello');
//}, isRunning ? 1000: null);
// isRunning이 true면 1초마다 hello출력, false면 interval 정지

function useInterval(callback, delay) {
    const savedCallback= useRef();

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        function tick() {
            savedCallback.current();
        };

        if (delay !== null) { //delay가 위 코드처럼 1000같은 값이 아닐 경우 null
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);

    return savedCallback.current;
}

export default useInterval;