import React, { useState } from 'react';
import { connect } from "react-redux";
import { addTodos } from "../redux/reducer.js";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';

/* ===========css start====================*/
const useStyles = makeStyles((theme) => ({
  root: {
    textAlign:'center',
  },
  Button: {
    padding: '5px 10px',
    margin: '5px',
  },
  TextField: {
    width: '50ch',
    margin: '5px',
  }
}));

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


/* ===========component start====================*/
const Todos = (props) => {
  const classes = useStyles();

  const [todo, settodo] = useState("");
  // console.log("props from store", props);

  // will call the addTodo reducer to add an item in list
  const add = () => {
    if (todo === "") {
      alert("no value added");
    }
    else {
      props.addTodo({
        id: Math.floor(Math.random() * 1000),
        item: todo,
        completed: false,
      });
      settodo("");
    }
  };

  return (
    <div>
      <TextField id="outlined-textarea" label="Task" placeholder="Enter Description" multiline
          variant="outlined" onChange={e => settodo(e.target.value)} value={todo}
          className={classes.TextField}
        />
      {/* <input type="text" onChange={e => settodo(e.target.value)} value={todo}></input> */}
      <Button color="primary" className={classes.Button} onClick={() => add()}>
        <Icon style={{ fontSize: 40 }} color="primary">add_circle</Icon>
      </Button>
      {/* <IconButton color="primary" style={{ fontSize: 400 }}>
          <AddCircleIcon/>
        </IconButton> */}
    </div>
  );
};

// to connect it with store and reducer
export default connect(mapStateToProps, mapDispatchToProps)(Todos);