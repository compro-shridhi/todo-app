// import { configureStore } from "@reduxjs/toolkit";
import { createStore, applyMiddleware, Store } from "redux"
import { todoState, todoAction, DispatchType } from '../type';
import { reducer } from "./reducer";
import thunk from "redux-thunk"

// convert object to string and store in localStorage
function saveToLocalStorage(state:object) {
  try {
    const todoData = JSON.stringify(state);
    localStorage.setItem("todoData", todoData);
  } catch (e) {
    console.warn(e);
  }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
  try {
    const todoData = localStorage.getItem("todoData");
    if (todoData === null) return undefined;
    return JSON.parse(todoData);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

// use loadFromLocalStorage to overwrite any values that we already have saved
const store: Store<todoState, todoAction> & {
  dispatch: DispatchType
} = createStore(reducer,loadFromLocalStorage(), applyMiddleware(thunk))


// const store = configureStore({
//   reducer: reducer,
// });

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;