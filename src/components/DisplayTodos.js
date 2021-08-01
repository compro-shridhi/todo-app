import React,{useState} from 'react'
import { connect } from "react-redux";
import { addTodos, removeTodos, updateTodos, completeTodos } from "../redux/reducer.js";
import TodoItem from "./TodoItem";

// to get new state and return state
const mapStateToProps = (state) => {
    return {
      todos: state,
    };
  };

// to dispatch action object receive from add() function
const mapDispatchToProps = (dispatch) => {
    return {
      addTodo: (obj) => dispatch(addTodos(obj)),
      removeTodo: (id) => dispatch(removeTodos(id)),
      updateTodo: (obj) => dispatch(updateTodos(obj)),
      completeTodo: (id) => dispatch(completeTodos(id)),
    };
  };

const DisplayTodos = (props) => {
    const [sort, setsort] = useState("active")
    return (
        <div>
            <div>
                <button onClick={()=>setsort("active")}>Active</button>
                <button onClick={()=>setsort("completed")}>Completed</button>
                <button onClick={()=>setsort("all")}>All</button>
            </div>
            <ul>
                {/* for active todos only  */}
                {props.todos.length > 0 && sort === "active" ? 
                    props.todos.map((item) => {
                    return (
                        item.completed === false && ( 
                        <TodoItem key={item.id} item={item}
                        removeTodo={props.removeTodo}
                        updateTodo={props.updateTodo}
                        completeTodo={props.completeTodo}
                        />    
                    )
                    );
                })
                : null}

                {/* for completed todos only  */}
                {props.todos.length > 0 && sort === "completed" ? 
                    props.todos.map((item) => {
                    return (
                        item.completed === true && ( 
                        <TodoItem key={item.id} item={item}
                        removeTodo={props.removeTodo}
                        updateTodo={props.updateTodo}
                        completeTodo={props.completeTodo}
                        />    
                    )
                    );
                })
                : null}

                {/* for all todos only  */}
                {props.todos.length > 0 && sort === "all" ? 
                    props.todos.map((item) => {
                    return (
                        <TodoItem key={item.id} item={item}
                        removeTodo={props.removeTodo}
                        updateTodo={props.updateTodo}
                        completeTodo={props.completeTodo}
                        />    
                    );
                })
                : null}
            </ul>
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(DisplayTodos)
