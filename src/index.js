import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./redux/store";
import Todos from './components/Todos.js'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Todos />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );