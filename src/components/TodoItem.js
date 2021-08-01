import React, { useRef } from "react";
// import { AiFillEdit } from "react-icons/ai";
// import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5";

const TodoItem = (props) => {
  
  const { item, updateTodo, removeTodo, completeTodo } = props;

  // to control the disable button - in complete and update button
  const inputRef = useRef(true);
  const changeDisable = () =>{
      inputRef.current.disabled = false;
      inputRef.current.focus();
  }

  const update = (id,value,e) =>{
      if(e.which === 13){
          updateTodo({id,item:value});
          inputRef.current.disabled = true;
      }
  }
  return (
    <li key={item.id}>
      <textarea ref={inputRef} disabled={inputRef} defaultValue={item.item}
      onKeyPress={(e)=> update(item.id, inputRef.current.value, e)}>
      </textarea>
      <button onClick={()=> changeDisable()}>Update</button>
      <button onClick={()=> completeTodo(item.id)}>Complete</button>
      <button onClick={()=> removeTodo(item.id)}>Delete</button>
      {""}
  </li>
  );
};

export default TodoItem;