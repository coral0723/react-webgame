import React, { Component } from "react";
import Ball from "./Ball";

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

class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(),
        winBalls: [],
        bonus: null,
        redo: false,
    }

    timeOuts = [];

    runTimeOuts = () => {
        const { winNumbers } = this.state;
        for (let i = 0; i < winNumbers.length-1; i++) {
            this.timeOuts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        winBalls: [...prevState.winBalls, winNumbers[i]],
                    };
                })
            }, (i + 1) * 1000);
        }
        this.timeOuts[6] = setTimeout(() => {
            this.setState({
                bonus: winNumbers(6),
                redo: true,
            });
        }, 7000);
    }

    componentDidMount() {
        this.runTimeOuts();
    };

    componentDidUpdate(prevProps, prevState) {
        if(this.winBalls.length === 0) {
            this.runTimeOuts();
        }
    }

    componentWillUnmount() {
        this.timeOuts.forEach((v) => {
            clearTimeout(v);
        });
    };

    onClickRedo = () => {
        this.setState({
            winNumbers: getWinNumbers(),
            winBalls: [],
            bonus: null,
            redo: false,
        });
        this.timeOuts = [];
    }

    render() {
        const { winBalls, bonus, redo } = this.state;
        return (
            <>
                <div>당첨 숫자</div>
                <div id='결과창'>
                    {winBalls.map((v) => <Ball key={v} number={v} />)}
                </div>
                <div>보너스!</div>
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick={this.onClickRedo}>한번 더!</button>}
            </>
        )

    }
}

export default Lotto;