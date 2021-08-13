import React, { useState, FC } from 'react'
import { useSelector, shallowEqual } from "react-redux";
// import { addTodos, removeTodos, updateTodos, completeTodos } from "../redux/reducer.js";
import TodoItem from "./TodoItem";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";

import { Itodo, todoState} from '../type';
import { removeTodo, updateTodo, completeTodo } from '../redux/actionCreators';

/* ===========css start====================*/
const useStyles = makeStyles((theme) => (
    {
        root: {
            flexGrow: 1,
            marginTop: '10px',
        },
        paper: {
            padding: '15px',
            textAlign: 'center',
        },
        Tablist: {
            backgroundColor: "white",
            color: "black",
            borderBottom: "0px",
            indicatorColor: "black",
        },
        Tab: {
            borderBottom: "0px",
            borderColor: "blue"
        },
        Text:{
            textAlign: 'left',
        }
    }
));

// // to get new state and return state
// const mapStateToProps = (state) => {
//     return {
//         todos: state,
//     };
// };

// // to dispatch action object receive from add() function
// const mapDispatchToProps = (dispatch) => {
//     return {
//         addTodo: (obj) => dispatch(addTodos(obj)),
//         removeTodo: (id) => dispatch(removeTodos(id)),
//         updateTodo: (obj) => dispatch(updateTodos(obj)),
//         completeTodo: (id) => dispatch(completeTodos(id)),
//     };
// };

/* ===========component start====================*/

const DisplayTodos: FC = () => {
    const classes = useStyles();

    const todos: readonly Itodo[] = useSelector(
        (state: todoState) => state.todos,
        shallowEqual
    )
    // console.log(todos);

    const [sort, setsort] = useState("active")

    const [value, setValue] = React.useState("1");

    const handleChange = (event:any, newValue:any) => {
        setValue(newValue);
    };

    var today = new Date();
    var date = today.getDate() + ' ' + today.toLocaleString('default', { month: 'short' }) + ', ' + today.getFullYear();
    // console.log(date);

    return (
        <div className={classes.root}>
            <TabContext value={value}>
                <TabList
                    indicatorColor="primary"
                    centered
                    className={classes.Tablist}
                    onChange={handleChange}
                >
                    <Tab
                        // disableRipple="true"
                        className={classes.Tab}
                        label="ACTIVE"
                        value="1"
                        onClick={() => setsort("active")}
                    />
                    <Tab
                        // disableRipple="true"
                        className={classes.Tablist}
                        label="COMPLETED"
                        value="2"
                        onClick={() => setsort("completed")}
                    />
                    <Tab
                        // disableRipple="true"
                        className={classes.Tablist}
                        label="ALL"
                        value="3"
                        onClick={() => setsort("all")}
                    />
                </TabList>
                <TabPanel value="1">
                    <h3 className={classes.Text}>TODAY</h3>
                    <Grid container direction="row" justifyContent="center" spacing={2}>
                        {/* for active todos only  */}
                        {todos.length > 0 && sort === "active" ?
                            todos.map((item) => {
                                return(
                                    item.completed === false && item.task_date===date && (
                                        <Grid key={item.id} item>
                                            <Paper className={classes.paper}>
                                                <TodoItem key={item.id} item={item}
                                                    removeTodo={removeTodo}
                                                    updateTodo={updateTodo}
                                                    completeTodo={completeTodo}
                                                    task_date={item.task_date}
                                                />
                                            </Paper>
                                        </Grid>
                                    )
                                );
                            })
                            : null}
                    </Grid>
                    <h3 className={classes.Text} >OVERDUE</h3>
                    <Grid container direction="row" justifyContent="center" spacing={2}>
                        {/* for active todos only  */}
                        {todos.length > 0 && sort === "active" ?
                            todos.map((item) => {
                                return(
                                    item.completed === false && item.task_date!==date && (
                                        <Grid key={item.id} item>
                                            <Paper className={classes.paper}>
                                                <TodoItem key={item.id} item={item}
                                                    removeTodo={removeTodo}
                                                    updateTodo={updateTodo}
                                                    completeTodo={completeTodo}
                                                    task_date={item.task_date}
                                                />
                                            </Paper>
                                        </Grid>
                                    )
                                );
                            })
                            : null}
                    </Grid>
                </TabPanel>
                <TabPanel value="2">
                    <Grid container direction="row" justifyContent="center" spacing={2}>
                        {/* for completes todos only  */}
                        {todos.length > 0 && sort === "completed" ?
                            todos.map((item) => {
                                return(
                                    item.completed === true && (
                                        <Grid key={item.id} item>
                                            <Paper className={classes.paper}>
                                                <TodoItem key={item.id} item={item}
                                                    removeTodo={removeTodo}
                                                    updateTodo={updateTodo}
                                                    completeTodo={completeTodo}
                                                    task_date={item.task_date}
                                                />
                                            </Paper>
                                        </Grid>
                                    )
                                );
                            })
                            : null}
                    </Grid>
                </TabPanel>
                <TabPanel value="3">
                    <Grid container direction="row" justifyContent="center" spacing={2}>
                        {/* for all todos only  */}
                        {todos.length > 0 && sort === "all" ?
                            todos.map((item) => {
                                return(
                                    <Grid key={item.id} item>
                                        <Paper className={classes.paper}>
                                            <TodoItem key={item.id} item={item}
                                                removeTodo={removeTodo}
                                                updateTodo={updateTodo}
                                                completeTodo={completeTodo}
                                                task_date={item.task_date}
                                            />
                                        </Paper>
                                    </Grid>
                                );
                            })
                            : null}
                    </Grid>
                </TabPanel>
            </TabContext>
            {/* <div>
                <button onClick={() => setsort("active")}>Active</button>
                <button onClick={() => setsort("completed")}>Completed</button>
                <button onClick={() => setsort("all")}>All</button>
            </div> */}
        </div>
    )
}

export default DisplayTodos
