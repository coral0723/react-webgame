import React, { Component } from "react";

class ResponseCheck extends Component {
    state = { 
        state: 'waiting',
        message: '클릭해서 시작하세요.',
        result: [],
    };
    
    //위의 state가 바뀌면 렌더링이 되지만
    //밑의 얘들은 바뀌어도 리렌더링이 되지 않는다
    timeout;
    startTime;
    endTime;

    onClickScreen = () => {
        const { state, message, result } = this.state;
        if (state === 'waiting') {
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요'
            });
            this.timeout = setTimeout(() => {
                this.setState({
                    state: 'now',
                    message: '지금 클릭!',
                });
                this.startTime = new Date();
            }, Math.floor(Math.random() * 1000) + 2000) //2초 ~ 3초 랜덤
        } else if (state === 'ready') {
            clearTimeout(this.timeout);
            this.setState({
                state: 'waiting',
                message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.',
            })
        } else if (state === 'now') {
            this.endTime = new Date();
            this.setState((prevState) => {
                return {
                    state: 'waiting',
                    message: '클릭해서 시작하세요',
                    result: [...prevState.result, this.endTime - this.startTime],
                }
            })
        }
    }

    renderAverage = () => {
        const { result } = this.state;
        return result.length === 0 
            ? null 
            : <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
    }

    render() {
        const { state, message } = this.state;
        return (
            <>
                <div
                    id='screen'
                    className={state}
                    onClick={this.onClickScreen}
                >
                    {message}
                </div>
                {this.renderAverage()}
                
            </>
        )
    }
}

export default ResponseCheck;