const React = require('react');
const ReactDOM = require('react-dom');

const WordRelay = require('./wordRelay');

// ReactDom.render(<WordRelay />, document.querySelector('#root'));
ReactDOM.createRoot(document.querySelector('#root')).render(<WordRelay />);