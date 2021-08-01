import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const addTodoReducer = createSlice({
    name:"todos",
    initialState,
    // group pf reducers
    reducers:{
        //adding todo reducer
        addTodos : (state,action) => {
            console.log("add reducer called");
            state.push(action.payload);
            return state;
        },
        //removing todo item after matching the id
        removeTodos :(state, action)=>{
            console.log("remove reducer called");
            return state.filter((item)=>item.id !== action.payload);
        },
        //updating the todo item
        updateTodos :(state, action)=>{
            console.log("update reducer called");
            return state.map((todo)=>{
                if(todo.id === action.payload.id){
                    return{...todo, item:action.payload.item};
                }
                return todo;
            });
        },
        //completed todos send
        completeTodos :(state, action)=>{
            console.log("complete reducer called");
            return state.map((todo)=>{
                if(todo.id === action.payload){
                    return{...todo, completed:true};
                }
                return todo;
            });
        },
    },// reducers end
}); // slice end

export const { addTodos, removeTodos, updateTodos, completeTodos } = addTodoReducer.actions;
export const reducer = addTodoReducer.reducer;