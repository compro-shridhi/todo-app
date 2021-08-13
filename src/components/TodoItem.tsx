import React, { useRef, FC} from "react";
import Chip from '@material-ui/core/Chip';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { green, blue, red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import IconButton from '@material-ui/core/IconButton';
// import Button from '@material-ui/core/Button';
// import DoneIcon from '@material-ui/icons/Done';
import TodayIcon from '@material-ui/icons/Today';

import { Itodo } from '../type';
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"

type Props = {
  item: Itodo
  removeTodo: (todo: Itodo) => void
  updateTodo: (todo: Itodo,value:string) => void
  completeTodo: (todo: Itodo) => void
  task_date:string
}
/* ===========css start====================*/
const useStyles = makeStyles((theme) => ({
  root: {
  },
  Button: {
    padding: '5px',
    margin: '5px',
    border: '1px solid',
    marginRight: '0px',
  },
  TextField: {
    width: '39.5ch',
  },
  date:{
    marginLeft:'0px',
    marginRight:'74px',
    padding: '10px',
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

const TodoItem:FC<Props> = ({ item, removeTodo, updateTodo, completeTodo, task_date }) => {
  const classes = useStyles();
  const dispatch: Dispatch<any> = useDispatch()
  // const { item, updateTodo, removeTodo, completeTodo, task_date } = props;
  
  // to control the disable button - in complete and update button
  const inputRef:any = useRef(true);
  const changeDisable = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  }
  //to update the todo content
  const update = (id:number, value:string, e:any) => {
    if (e.which === 13) {
      dispatch(updateTodo(item, value));
      // updateTodo({ id, item: value });
      inputRef.current.disabled = true;
    }
  }
  const complete = React.useCallback(
    (todo: Itodo) => dispatch(completeTodo(todo)),
    [dispatch, completeTodo]
  )
  const remove = React.useCallback(
    (todo: Itodo) => dispatch(removeTodo(todo)),
    [dispatch, removeTodo]
  )
  return (
    <li key={item.id}>
      <TextField id="outlined-multiline-static" multiline rows={4} label="task" variant="outlined"
        className={classes.TextField} color="primary"
        inputRef={inputRef} disabled={inputRef} defaultValue={item.item}
        onKeyPress={(e) => update(item.id, inputRef.current.value, e)} />
      <br />
      <Chip className={classes.date} variant="outlined" size="medium" label={task_date} icon={<TodayIcon />} />
      <ThemeProvider theme={bluetheme}>
        <IconButton color="primary" className={classes.Button}
          onClick={() => changeDisable()}>
          <EditIcon />
        </IconButton>
        <ThemeProvider theme={greentheme}>
          <IconButton color="primary" className={classes.Button}
            onClick={() => complete(item)}>
            <AssignmentTurnedInIcon />
          </IconButton>
        </ThemeProvider>
        <ThemeProvider theme={redtheme}>
          <IconButton color="primary"  className={classes.Button}
            onClick={() => remove(item)}>
            <DeleteIcon />
          </IconButton>
        </ThemeProvider>
      </ThemeProvider>
      {""}
    </li>
  );
};

export default TodoItem;