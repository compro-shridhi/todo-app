import "./css/main.css"
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./redux/store";
import Todos from './components/Todos.js'
import DisplayTodos from './components/DisplayTodos';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';

function App() {
    return (
        // <Container maxWidth="sm">
        //     <Typography component="div">
        //         <h1>TODO APP</h1>
        //         <Todos />
        //         <DisplayTodos/>
        //     </Typography>
        // </Container>
        <div className="App">
            <h1>TODO APP</h1>
            <Todos />
            <DisplayTodos/>
        </div>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );