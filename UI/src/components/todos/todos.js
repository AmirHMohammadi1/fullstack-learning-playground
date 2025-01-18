import { memo } from 'react';
import { useState } from 'react';
import Todo from './todo/todo';
import ErrorPage from '../error/errorPage';
import Button from '../UI/button/button';

const Todos=(props)=>{
    // const adad = 1
    // if (adad > 1) {
    //     console.log(adad)
    //     throw new Error('Im Sorry');
    // }
    const[toggle,settoggle]=useState(true);
    const toggleHandler=()=>{
        // console.log(toggle)
        settoggle(!toggle)
    }
    
    return(
        props.todosState.map((todo,index)=>
            <ErrorPage key={index}>
            <Todo 
                id={todo.id}
                todoTitle={todo.todoTitle}
                todoStart={todo.todoStart}
                todoTime={todo.todoTime}
                todoPr={todo.todoPr}

                titleChange={(event)=>props.titleChangeHandler(event,todo.id)}
                startChange={(event)=>props.startChangeHandler(event,todo.id)}
                timeChange={(event)=>props.timeChangeHandler(event,todo.id)}
                prChange={(event)=>props.prChangeHandler(event,todo.id)}

                delete={()=>props.deletetodo(todo.id)}

                // toggler={props.toggler}
                toggler={toggle}
            />
            <Button
                className="Animation changeShow"
                btnType="success"
                clicked={toggleHandler}
                >
                    تفییر وضعیت نمایش
            </Button>
            </ErrorPage>
        )
    )
}

export default memo(Todos);