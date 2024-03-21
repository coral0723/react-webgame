const path = require('path'); //node에서 제공하는 경로 조작하는 툴

module.exports = {
    name: 'wordrelay-setting',
    mode: 'development', //실서비스: production
    devtool: 'eval', //빠르게
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    entry: {
        app: ['./client'],
    }, //입력
    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties'],
            }
        }]
    },
    output: {
        path: path.join(__dirname, 'dist'), //현재경로(__dirname = lecture) 안에 있는 dist 폴더
        filename: 'app.js'
    }, //출력

};