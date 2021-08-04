import React, { useState } from 'react'
import { connect } from "react-redux";
import { addTodos, removeTodos, updateTodos, completeTodos } from "../redux/reducer.js";
import TodoItem from "./TodoItem";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";

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
        }
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

/* ===========component start====================*/

const DisplayTodos = (props) => {
    const classes = useStyles();

    const [sort, setsort] = useState("active")

    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                        {props.todos.length > 0 && sort === "all" ?
                            props.todos.map((item) => {
                                return (
                                    <Grid key={item.id} item>
                                        <Paper className={classes.paper}>
                                            <TodoItem key={item.id} item={item}
                                                removeTodo={props.removeTodo}
                                                updateTodo={props.updateTodo}
                                                completeTodo={props.completeTodo}
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

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos)
