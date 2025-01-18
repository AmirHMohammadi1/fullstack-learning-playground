import TodoList from "./todoList/todoList";

const todosList = (props)=>{
    return(
        props.todosState.map((todo,index)=>
            <TodoList key={index}
                id={todo.id}
                todoTitle={todo.todoTitle}

                titleChange={(event)=>props.titleChangeHandler(event,todo.id)}

                delete={()=>props.deletetodo(todo.id)}
            />
        )
    )
}

export default todosList