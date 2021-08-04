import React, { useRef } from "react";
import Button from '@material-ui/core/Button';
import {createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { green, blue} from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

/* ===========css start====================*/
const useStyles = makeStyles((theme) => ({
  root: {
  },
  Button: {
    padding:'5px 10px',
    margin:'5px',
  },
  TextField:{
    width: '39.5ch',
  }
}));
const bluetheme = createTheme({
  palette: {
    primary: blue,
  },
});
const greentheme = createTheme({
  palette: {
    primary: green,
  },
});

/* ===========component start====================*/

const TodoItem = (props) => {
  const classes = useStyles();

  const { item, updateTodo, removeTodo, completeTodo } = props;

  // to control the disable button - in complete and update button
  const inputRef = useRef(true);
  const changeDisable = () =>{
      inputRef.current.disabled = false;
      inputRef.current.focus();
  }
  //to update the todo content
  const update = (id,value,e) =>{
      if(e.which === 13){
          updateTodo({id,item:value});
          inputRef.current.disabled = true;
      }
  }
  return (
    <li key={item.id}>
      <TextField id="outlined-multiline-static"  multiline rows={4} label="task" variant="outlined" 
      className={classes.TextField} color="primary"
      inputRef={inputRef} disabled={inputRef} defaultValue={item.item}
      onKeyPress={(e)=> update(item.id, inputRef.current.value, e)}/>
      {/* <textarea ref={inputRef} disabled={inputRef} defaultValue={item.item}
      onKeyPress={(e)=> update(item.id, inputRef.current.value, e)}>
      </textarea> */}
      <br/>
      <ThemeProvider theme={bluetheme}>
        <Button color="primary" variant="outlined" className={classes.Button} startIcon={<EditIcon />}
        onClick={()=> changeDisable()}>
          Update
        </Button>
        <ThemeProvider theme={greentheme}>
          <Button color="primary" variant="outlined" className={classes.Button} startIcon={<AssignmentTurnedInIcon />}
          onClick={()=> completeTodo(item.id)}>
            Complete
          </Button>
        </ThemeProvider>
      </ThemeProvider>
      <Button color="secondary" variant="outlined" className={classes.Button} startIcon={<DeleteIcon />} 
      onClick={()=> removeTodo(item.id)}>
        Delete
      </Button>
      {""}
  </li>
  );
};

export default TodoItem;