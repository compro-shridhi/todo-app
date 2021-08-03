import React,{useState} from 'react'
import { connect } from "react-redux";
import { addTodos, removeTodos, updateTodos, completeTodos } from "../redux/reducer.js";
import TodoItem from "./TodoItem";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme)=>(
    {
        root:{
            flexGrow:1,
        },
        paper:{
            padding:'15px',
            textAlign: 'center',
        },
    }
));

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
    const classes = useStyles();

    const [sort, setsort] = useState("active")
    return (
        <div>
            <div>
                <button onClick={()=>setsort("active")}>Active</button>
                <button onClick={()=>setsort("completed")}>Completed</button>
                <button onClick={()=>setsort("all")}>All</button>
            </div>
            <Grid container direction="row" justifyContent="center" spacing={2}>
                {/* for active todos only  */}
                {props.todos.length > 0 && sort === "active" ? 
                    props.todos.map((item) => {
                    return (
                        item.completed === false && ( 
                            <Grid key={item.id} item>
                                <Paper className={classes.paper}>
                                    <TodoItem key={item.id} item={item}
                                    removeTodo={props.removeTodo}
                                    updateTodo={props.updateTodo}
                                    completeTodo={props.completeTodo}
                                    />   
                                </Paper>
                            </Grid>    
                    )
                    );
                })
                : null}
                {/* for completes todos only  */}
                {props.todos.length > 0 && sort === "completed" ? 
                    props.todos.map((item) => {
                    return (
                        item.completed === true && ( 
                            <Grid key={item.id} item>
                                <Paper className={classes.paper}>
                                    <TodoItem key={item.id} item={item}
                                    removeTodo={props.removeTodo}
                                    updateTodo={props.updateTodo}
                                    completeTodo={props.completeTodo}
                                    />   
                                </Paper>
                            </Grid>    
                    )
                    );
                })
                : null}
                {/* for all todos only  */}
                {props.todos.length > 0 && sort === "all" ? 
                    props.todos.map((item) => {
                    return (
                            <Grid key={item.id} item>
                                <Paper className={classes.paper}>
                                    <TodoItem key={item.id} item={item}
                                    removeTodo={props.removeTodo}
                                    updateTodo={props.updateTodo}
                                    completeTodo={props.completeTodo}
                                    />   
                                </Paper>
                            </Grid>    
                    );
                })
                : null}
            </Grid>
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(DisplayTodos)
