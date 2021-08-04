import React, { useRef } from "react";
import Chip from '@material-ui/core/Chip';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { green, blue, red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';

/* ===========css start====================*/
const useStyles = makeStyles((theme) => ({
  root: {
  },
  Button: {
    padding: '5px',
    margin: '5px',
    border: '1px solid',
  },
  TextField: {
    width: '39.5ch',
  },
  date:{
    marginLeft:'0px',
    marginRight:'100px'
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
const redtheme = createTheme({
  palette: {
    primary: red,
  },
});

/* ===========component start====================*/

const TodoItem = (props) => {
  const classes = useStyles();

  const { item, updateTodo, removeTodo, completeTodo, task_date } = props;

  // to control the disable button - in complete and update button
  const inputRef = useRef(true);
  const changeDisable = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  }
  //to update the todo content
  const update = (id, value, e) => {
    if (e.which === 13) {
      updateTodo({ id, item: value });
      inputRef.current.disabled = true;
    }
  }
  return (
    <li key={item.id}>
      <TextField id="outlined-multiline-static" multiline rows={4} label="task" variant="outlined"
        className={classes.TextField} color="primary"
        inputRef={inputRef} disabled={inputRef} defaultValue={item.item}
        onKeyPress={(e) => update(item.id, inputRef.current.value, e)} />
      {/* <textarea ref={inputRef} disabled={inputRef} defaultValue={item.item}
      onKeyPress={(e)=> update(item.id, inputRef.current.value, e)}>
      </textarea> */}
      <br />
      <Chip className={classes.date} variant="outlined" size="medium" label={task_date} icon={<DoneIcon />} />
      <ThemeProvider theme={bluetheme}>
        <IconButton color="primary" variant="outlined" className={classes.Button}
          onClick={() => changeDisable()}>
          <EditIcon />
        </IconButton>
        <ThemeProvider theme={greentheme}>
          <IconButton color="primary" variant="outlined" className={classes.Button}
            onClick={() => completeTodo(item.id)}>
            <AssignmentTurnedInIcon />
          </IconButton>
        </ThemeProvider>
        <ThemeProvider theme={redtheme}>
          <IconButton color="primary" variant="outlined" className={classes.Button}
            onClick={() => removeTodo(item.id)}>
            <DeleteIcon />
          </IconButton>
        </ThemeProvider>
      </ThemeProvider>
      {""}
    </li>
  );
};

export default TodoItem;