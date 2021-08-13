// import { Switch } from "@material-ui/core";
// import { createSlice } from "@reduxjs/toolkit";
import { Itodo, todoAction, todoState } from '../type';
import * as actionTypes from "./actionTypes";

const initialState: todoState = {
    todos: []
};

const addTodoReducer = (
    state: todoState = initialState,
    action: todoAction,
): todoState => {
    switch(action.type){
        case actionTypes.ADD_TODO: console.log("add reducer called");
            const newtodo: Itodo = {
                id: action.todo.id,
                item: action.todo.item,
                completed: action.todo.completed,
                task_date: action.todo.task_date,
            };
            return {...state, todos: state.todos.concat(newtodo),
            };
        case actionTypes.REMOVE_TODO: console.log("remove reducer called");
            const removetodo: Itodo[] = state.todos.filter((item)=>item.id !== action.todo.id);
            // console.log(removetodo);
            return {...state, todos: removetodo, };
        case actionTypes.UPDATE_TODO: console.log("update reducer called");
            const newTodo = state.todos.map(todo=>{
                if(todo.id === action.todo.id){
                }
                return todo;
            });
            // console.log(newTodo);
            return {...state, todos: newTodo };
        case actionTypes.COMPLETE_TODO: console.log("complete reducer called");
            const newnewtodo = state.todos.map(todo=>{
                if(todo.id === action.todo.id){
                    todo.completed=true;
                }
                return todo;
            });
            // console.log(newnewtodo);
            return {...state, todos:newnewtodo };
        default:
            return state;
    }
};
export const reducer = addTodoReducer;
// const addTodoReducer = createSlice({
//     name:"todos",
//     state = initialState,
//     // group pf reducers
//     reducers:{
//         //adding todo reducer
//         addTodos : (state,action) => {
//             console.log("add reducer called");
//             state.push(action.payload);
//             return state;
//         },
//         //removing todo item after matching the id
//         removeTodos :(state, action)=>{
//             console.log("remove reducer called");
//             return state.filter((item)=>item.id !== action.payload);
//         },
//         //updating the todo item
//         updateTodos :(state, action)=>{
//             console.log("update reducer called");
//             return state.map((todo)=>{
//                 if(todo.id === action.payload.id){
//                     return{...todo, item:action.payload.item};
//                 }
//                 return todo;
//             });
//         },
//         //completed todos send
//         completeTodos :(state, action)=>{
//             console.log("complete reducer called");
//             return state.map((todo)=>{
//                 if(todo.id === action.payload){
//                     return{...todo, completed:true};
//                 }
//                 return todo;
//             });
//         },
//     },// reducers end
// }); // slice end

// export const { addTodos, removeTodos, updateTodos, completeTodos } = addTodoReducer.actions;
// export const reducer = addTodoReducer.reducer;