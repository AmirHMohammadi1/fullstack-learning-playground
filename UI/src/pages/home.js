import { Fragment, useState , useEffect , useRef} from 'react';
import Todos from '../components/todos/todos';
import TodosList from '../components/todos/todosList';
import Newtodo from '../components/todos/newTodo/newTodo';
import Button from '../components/UI/button/button';
// import { useLocation } from 'react-router';


const Home = (props)=>{
  // const Location = useLocation();
  // console.log(Location)

    const[todosState,settodos]=useState([
      {id:1,todoTitle:'برنامه نویسی',todoStart:'10:00',todoTime:'60',todoPr:'برای شروع'},
      {id:2,todoTitle:'برنامه نویسی',todoStart:'10:00',todoTime:'60',todoPr:'برای شروع'},
      {id:3,todoTitle:'برنامه نویسی',todoStart:'10:00',todoTime:'60',todoPr:'برای شروع'},
      {id:4,todoTitle:'برنامه نویسی',todoStart:'10:00',todoTime:'60',todoPr:'برای شروع'},
    ]);
    
    const inputElement = useRef()

    const titleChangeHandler=(event,id)=>{
        const todoIndex = todosState.findIndex(todo=>{
            return todo.id===id
        })
        // console.log(todoIndex)
        const todo = {...todosState[todoIndex]}
        todo.todoTitle = event.target.value
        // console.log(todo)
        const todos = [...todosState]
        todos[todoIndex] = todo
        settodos(todos)
    }
    const startChangeHandler=(event,id)=>{
      const todoIndex = todosState.findIndex(todo=>{
          return todo.id===id
      })
      const todo = {...todosState[todoIndex]}
      todo.todoStart = event.target.value
      const todos = [...todosState]
      todos[todoIndex] = todo
      settodos(todos)
    }
    const timeChangeHandler=(event,id)=>{
    const todoIndex = todosState.findIndex(todo=>{
        return todo.id===id
    })
    const todo = {...todosState[todoIndex]}
    todo.todoTime = event.target.value
    const todos = [...todosState]
    todos[todoIndex] = todo
    settodos(todos)
    }
    const prChangeHandler=(event,id)=>{
    const todoIndex = todosState.findIndex(todo=>{
        return todo.id===id
    })
    const todo = {...todosState[todoIndex]}
    todo.todoPr = event.target.value
    const todos = [...todosState]
    todos[todoIndex] = todo
    settodos(todos)
    }

    const deletetodo = (id)=>{
        const todoIndex = todosState.findIndex(todo=>{
            return todo.id===id
        })
        const todos = [...todosState]
        todos.splice(todoIndex,1)
        settodos(todos)
    }

    const[todosHolder,settodosHolder]=useState([])
    const[searchbarValue,setSearchbarValue]=useState('');
    useEffect(()=>{
        settodosHolder(todosState)
        inputElement.current.focus()
        // console.log(props)
    },[])
    const searchbarFilterFunction=(event)=>{
      const itemData = todosHolder.filter((item)=>{
        const itemData = item.todoTitle
        const itemText = event.target.value
        return itemData.indexOf(itemText)>-1
      })
      settodos(itemData)
      setSearchbarValue(event.target.value)
    }


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
      todosState.push({
        'id':todosState.length+1,
        'todoTitle':FtodoTitle,
        'todoStart':FtodoStart,
        'todoTime':FtodoTime,
        'todoPr':FtodoPr
      })
      settodos(todosState)
      setFtodoTitle('')
      setFtodoStart('')
      setFtodoTime('')
      setFtodoPr('')
    }

    const scrollToTop=()=>{
      window.scrollTo(0,inputElement.current.offsetTop-100)
      inputElement.current.focus()
    }


    return (
        <Fragment>
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

            <span className='searchBarCountainer'>
            <label className='searchbar'>جستجوی فعالیت</label>
            <input type="text" id='searchbar' ref={inputElement} value={searchbarValue} onChange={searchbarFilterFunction}></input>
            </span>

            <div className='todoList'>
            <TodosList
                todosState={todosState}
                titleChangeHandler={titleChangeHandler}
                deletetodo={deletetodo}
            />
            </div>

            <div className='todosCountainer'>
                <Todos
                    todosState={todosState}
                    titleChangeHandler={titleChangeHandler}
                    startChangeHandler={startChangeHandler}
                    timeChangeHandler={timeChangeHandler}
                    prChangeHandler={prChangeHandler}
                    deletetodo={deletetodo}
                />
            </div>

            <Button
                className="Animation scroll"
                btnType="success"
                clicked={scrollToTop}
            >
                جستجو
            </Button>
        </Fragment>
    )
}

export default Home;