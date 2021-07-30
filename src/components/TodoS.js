import React,{useState} from 'react';
import { connect } from "react-redux";
import { addTodos, removeTodos, updateTodos, completeTodos } from "../redux/reducer.js";

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
    };
  };

const Todos = (props) => {
    const [todo, settodo] = useState("");
    console.log("props from store", props);

    // will call the addTodo reducer to add an item in list
    const add = () =>{
        if(todo === ""){
            alert("no value added");
        }
        else{
            props.addTodo({
                id: Math.floor(Math.random() * 1000),
                item: todo,
                completed: false,
            });
            settodo("");
        }
    };

    return(
        <div>
            <input type="text" onChange={e=>settodo(e.target.value)} value={todo}></input>
            <br/>
            <button onClick={()=>add()}>ADD</button>
            <ul>
                {props.todos.length > 0 &&
                props.todos.map((item) => {
                    return <li key={item.id}>{item.item}</li>;
                })}
            </ul>
        </div>
    );
};

// to connect it with store and reducer
export default connect(mapStateToProps,mapDispatchToProps)(Todos);