import React from 'react';
import ReactDOM from 'react-dom';
import Todos from './components/Todos.js'

function Main() {
    return (
        <div>
            <Todos/>
        </div>
    )
}

ReactDOM.render(<Main/>,document.getElementById('root'));