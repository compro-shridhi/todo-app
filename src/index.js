import React from 'react';
import ReactDOM from 'react-dom';
import Todo from '../components/Todo.js'

function Main() {
    return (
        <div>
            <Todo/>
        </div>
    )
}

ReactDOM.render(<Main/>,document.getElementById('root'));