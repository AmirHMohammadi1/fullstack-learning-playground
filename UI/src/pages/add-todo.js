import {useState} from 'react';
import Newtodo from '../components/todos/newTodo/newTodo';

const AddTodo = ()=>{

    const[FtodoTitle,setFtodoTitle]=useState('')
    const[FtodoStart,setFtodoStart]=useState('')
    const[FtodoTime,setFtodoTime]=useState('')
    const[FtodoPr,setFtodoPr]=useState('')
    const HandleFtodoTitle=(event)=>{
        setFtodoTitle(event.target.value)
    }
    const HandleFtodoStart=(event)=>{
        setFtodoStart(event.target.value)
    }
    const HandleFtodoTime=(event)=>{
        setFtodoTime(event.target.value)
    }
    const HandleFtodoPr=(event)=>{
        setFtodoPr(event.target.value)
    }
    const addtodo=()=>{
        alert('todo added');
        // todosState.push({
        //     'id':todosState.length+1,
        //     'todoTitle':FtodoTitle,
        //     'todoStart':FtodoStart,
        //     'todoTime':FtodoTime,
        //     'todoPr':FtodoPr
        // })
        // settodos(todosState)
        // setFtodoTitle('')
        // setFtodoStart('')
        // setFtodoTime('')
        // setFtodoPr('')
    }

    return(
        <Newtodo
            todoTitle={FtodoTitle}
            todoStart={FtodoStart}
            todoTime={FtodoTime}
            todoPr={FtodoPr}
            HtodoTitle={HandleFtodoTitle}
            HtodoStart={HandleFtodoStart}
            HtodoTime={HandleFtodoTime}
            HtodoPr={HandleFtodoPr}
            addtodo={addtodo}
        />

    )
}

export default AddTodo;