import { Fragment, useState , useEffect , useRef} from 'react';
import Todos from '../components/todos/todos';
import TodosList from '../components/todos/todosList';
// import Newtodo from '../components/todos/newTodo/newTodo';
import Button from '../components/UI/button/button';
// import axios from 'axios'
// import { useLocation } from 'react-router';


const Home = ()=>{
  // const Location = useLocation();
  // console.log(Location)

    const[todosState,settodos]=useState([
      {id:1,todoTitle:'آموزش برنامه نویسی',todoStart:'9:00',todoTime:'60',todoPr:'برای شروع'},
      {id:2,todoTitle:'کتاب و مظالعه',todoStart:'10:00',todoTime:'30',todoPr:'برای شروع'},
      {id:3,todoTitle:'آموزش زبان',todoStart:'10:30',todoTime:'120',todoPr:'برای شروع'},
      {id:4,todoTitle:'کار عمیق',todoStart:'12:30',todoTime:'120',todoPr:'برای شروع'},
    ]);
    // const[Loading,setLoading]=useState(false)
    // useEffect(()=>{
    //   axios.get('http://127.0.0.1:3001/todo').then(
    //     Response => 
    //       // console.log(Response.data)
    //       settodos(Response.data),
    //       setLoading(false)
    //   )
    // },[])

    // ? delete todo
    const deletetodo = (id)=>{
        const todoIndex = todosState.findIndex(todo=>{
            return todo.id===id
        })
        const todos = [...todosState]
        todos.splice(todoIndex,1)
        settodos(todos)
    }

    // ? searchbar
    const inputElement = useRef()

    const[todosHolder,settodosHolder]=useState([])
    const[searchbarValue,setSearchbarValue]=useState('');
    useEffect(()=>{
        settodosHolder(todosState)
        inputElement.current.focus()
        // console.log(props)
    },[todosState])
    const searchbarFilterFunction=(event)=>{
      const itemData = todosHolder.filter((item)=>{
        const itemData = item.todoTitle
        const itemText = event.target.value
        return itemData.indexOf(itemText)>-1
      })
      settodos(itemData)
      setSearchbarValue(event.target.value)
    }

    // ? add todo
    // const[FtodoTitle,setFtodoTitle]=useState('')
    // const[FtodoStart,setFtodoStart]=useState('')
    // const[FtodoTime,setFtodoTime]=useState('')
    // const[FtodoPr,setFtodoPr]=useState('')
    // const HandleFtodoTitle=(event)=>{
    //   setFtodoTitle(event.target.value)
    // }
    // const HandleFtodoStart=(event)=>{
    //   setFtodoStart(event.target.value)
    // }
    // const HandleFtodoTime=(event)=>{
    //   setFtodoTime(event.target.value)
    // }
    // const HandleFtodoPr=(event)=>{
    //   setFtodoPr(event.target.value)
    // }
    // const addtodo=()=>{
    //   todosState.push({
    //     'id':todosState.length+1,
    //     'todoTitle':FtodoTitle,
    //     'todoStart':FtodoStart,
    //     'todoTime':FtodoTime,
    //     'todoPr':FtodoPr
    //   })
    //   settodos(todosState)
    //   setFtodoTitle('')
    //   setFtodoStart('')
    //   setFtodoTime('')
    //   setFtodoPr('')
    // }

    //  ? scroll to 
    const scrollToTop=()=>{
      window.scrollTo(0,inputElement.current.offsetTop-100)
      inputElement.current.focus()
    }


    return (
        <Fragment>
            {/* <Newtodo
                todoTitle={FtodoTitle}
                todoStart={FtodoStart}
                todoTime={FtodoTime}
                todoPr={FtodoPr}
                HtodoTitle={HandleFtodoTitle}
                HtodoStart={HandleFtodoStart}
                HtodoTime={HandleFtodoTime}
                HtodoPr={HandleFtodoPr}
                addtodo={addtodo}
            /> */}

            <span className='searchBarCountainer'>
            <label className='searchbar'>جستجوی فعالیت</label>
            <input type="text" id='searchbar' ref={inputElement} value={searchbarValue} onChange={searchbarFilterFunction}></input>
            </span>

            {/* { Loading ? <h1>...loading</h1> :
              <>
                <div className='todoList'>
                <TodosList
                    todosState={todosState}
                    deletetodo={deletetodo}
                />
                </div>
    
                <div className='todosCountainer'>
                    <Todos
                        todosState={todosState}
                        // titleChangeHandler={titleChangeHandler}
                        // startChangeHandler={startChangeHandler}
                        // timeChangeHandler={timeChangeHandler}
                        // prChangeHandler={prChangeHandler}
                        deletetodo={deletetodo}
                    />
                </div>
              </>
            } */}

                <div className='todoList'>
                <TodosList
                    todosState={todosState}
                    deletetodo={deletetodo}
                />
                </div>
    
                <div className='todosCountainer'>
                    <Todos
                        todosState={todosState}
                        // titleChangeHandler={titleChangeHandler}
                        // startChangeHandler={startChangeHandler}
                        // timeChangeHandler={timeChangeHandler}
                        // prChangeHandler={prChangeHandler}
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