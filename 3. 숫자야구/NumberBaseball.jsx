import React, { Component } from 'react';
import Try from './Try';

function getNumbers() { //숫자 네 개를 겹치지 않게 뽑는 함수
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for (let i = 0; i < 4; i++) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}
class NumberBaseball extends Component {
    state = {
        value: '',
        result: '',
        answer: getNumbers(),
        tries: [],
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        console.log(this.state);
        if (this.state.value === this.state.answer.join('')) { //홈런일때
            this.setState({
                result: '홈런!',
                tries: [...this.state.tries, { try: this.state.value, result: '홈런!' }], 
                //참조가 아닌 아예 다른 배열을 만들어서 대입을 해야 리액트가 바뀌는 state를 감지할 수 있다.
                //그래서 리액트에서는 push를 사용하지 않는다.
            })
            alert('게임을 다시 시작합니다.');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            });
        } else { //홈런이 아닐 때
            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (this.state.tries.length >= 9) { //10번 틀렸을 때
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')}였습니다!`,
                });
                alert('게임을 다시 시작합니다.');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
            } else { //10번 이하로 틀렸을 때
                for (let i = 0; i < 4; i++) {
                    if(answerArray[i] === this.state.answer[i]) {
                        strike += 1;
                    } else if (this.state.answer.includes(answerArray[i])) {
                        ball += 1;
                    } 
                };
                this.setState({
                    tries: [...this.state.tries, { try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼입니다.` }],
                    value: '',
                });
            }
        }
        console.log(this.state);
    }

    onChangeInput = (e) => {
        this.setState({
            value: e.target.value,
        })
    }

    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    {this.state.tries.map((v, i) => {
                        return (
                            <Try key={`${i + 1}차 시도`} tryInfo = {v}/>
                        )
                    })}
                </ul>
            </>
        )
    }
}

export default NumberBaseball;
