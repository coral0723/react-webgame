import React, { useState, useRef, useEffect, useMemo } from "react";

function getWinNumbers() {
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const suffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(), []);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeOuts = useRef([]);

    useEffect(() => {
        for (let i = 0; i < winNumbers.length-1; i++) {
            timeOuts.current[i] = setTimeout(() => {
                setWinBalls((prevWinballs) => {
                    [...prevWinballs, winNumbers[i]]
                });
            }, (i + 1) * 1000);
        }
        timeOuts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
        return () => {
            timeOuts.current.forEach((v) => {
                clearTimeout(v);
            });
        }
    }, [timeOuts.current]); //빈 배열이면 componentDidMount와 동일

    onClickRedo = () => {
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeOuts.current = [];
    }

    return (
        <>
            <div>당첨 숫자</div>
            <div id='결과창'>
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={onClickRedo}>한번 더!</button>}
        </>
    );
}

export default Lotto;