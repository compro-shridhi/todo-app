import React from 'react';

const Todos = (props) => {
    const [todo, settodo] = useState("");

    return(
        <div>
            <input type="text" onChange={e=>settodo(e.target.value)} value={todo}></input>
            <br/>
            <button >ADD</button>
        </div>
    );
};

export default Todos;