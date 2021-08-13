import { Itodo, todoAction, DispatchType } from '../type';
import * as actionTypes from "./actionTypes"
// import { action } from 'typesafe-actions';

export function addTodo(todo: Itodo) {
    const action: todoAction = {
        type: actionTypes.ADD_TODO,
        todo,
    }
    return (dispatch: DispatchType) => {
        dispatch(action)
    }
}

export function removeTodo(todo: Itodo) {
    const action: todoAction = {
        type: actionTypes.REMOVE_TODO,
        todo,
    }
    return (dispatch: DispatchType) => {
        dispatch(action)
    }
}
export function updateTodo(todo: Itodo, value:string) {
    todo.item=value;
    const action: todoAction = {
        type: actionTypes.UPDATE_TODO,
        todo,
    }
    return (dispatch: DispatchType) => {
        dispatch(action)
    }
}
export function completeTodo(todo: Itodo) {
    const action: todoAction = {
        type: actionTypes.COMPLETE_TODO,
        todo,
    }
    return (dispatch: DispatchType) => {
        dispatch(action)
    }
}