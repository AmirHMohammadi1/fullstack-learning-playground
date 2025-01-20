import { Fragment , useState , useEffect } from "react";
import { useParams, Navigate } from "react-router";
// import axios from "axios";
import EditTodo from "../components/todos/editTodo/editTodo";

const EditPage = ()=>{
    const params = useParams()
    // console.log(params.id)
    let shoudeRedirect = false
    if (params.id) {
        shoudeRedirect = true
    }

    // const[todoState,settodo]=useState([]);
    // useEffect(()=>{
    //   axios.get('http://127.0.0.1:3001/todo/' + params.id).then(
    //     Response => 
    //       // console.log(Response.data)
    //       settodo(Response.data)
    //   )
    // },[])

    // const titleChangeHandler=(event,id)=>{
    //     const todoIndex = todoState.findIndex(todo=>{
    //         return todo.id===id
    //     })
    //     // console.log(todoIndex)
    //     const todo = {...todoState[todoIndex]}
    //     todo.todoTitle = event.target.value
    //     // console.log(todo)
    //     const todos = [...todoState]
    //     todos[todoIndex] = todo
    //     settodo(todos)
    // }
    // const startChangeHandler=(event,id)=>{
    //     const todoIndex = todoState.findIndex(todo=>{
    //         return todo.id===id
    //     })
    //     const todo = {...todoState[todoIndex]}
    //     todo.todoStart = event.target.value
    //     const todos = [...todoState]
    //     todos[todoIndex] = todo
    //     settodo(todos)
    // }
    // const timeChangeHandler=(event,id)=>{
    //     const todoIndex = todoState.findIndex(todo=>{
    //         return todo.id===id
    //     })
    //     const todo = {...todoState[todoIndex]}
    //     todo.todoTime = event.target.value
    //     const todos = [...todoState]
    //     todos[todoIndex] = todo
    //     settodo(todos)
    // }
    // const prChangeHandler=(event,id)=>{
    //     const todoIndex = todoState.findIndex(todo=>{
    //         return todo.id===id
    //     })
    //     const todo = {...todoState[todoIndex]}
    //     todo.todoPr = event.target.value
    //     const todos = [...todoState]
    //     todos[todoIndex] = todo
    //     settodo(todos)
    // }
    
    return (
        <Fragment>
            {shoudeRedirect ? null : <Navigate replace to='/' state={{redirected:'true'}}/>}
            
            <EditTodo
                params={params}
            />
        </Fragment>
        
    )
}

export default EditPage;