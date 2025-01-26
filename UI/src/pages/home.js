import { Fragment, useState , useEffect , useRef} from 'react';
import Todos from '../components/todos/todos';
import TodosList from '../components/todos/todosList';
import Button from '../components/UI/button/button';
import axios from 'axios'


const Home = ()=>{

    const[todosState,settodos]=useState([]);
    const[Loading,setLoading]=useState(true)
    useEffect(()=>{
      axios.get('http://127.0.0.1:3001/todo').then(
        Response => 
          settodos(Response.data),
          setLoading(false)
      )
    },[])

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
        const itemText = event.target.value
        if (itemText) {
            const itemData = todosHolder.filter((item)=>{
                const itemData = item.todoTitle
                // const itemText = event.target.value
                return itemData.indexOf(itemText)>-1
              })
              settodos(itemData)
              setSearchbarValue(event.target.value)
        } else {
            settodos(todosState)
        }
    }



    //  ? scroll to 
    const scrollToTop=()=>{
      window.scrollTo(0,inputElement.current.offsetTop-100)
      inputElement.current.focus()
    }


    return (
        <Fragment>

            <span className='searchBarCountainer'>
            <label className='searchbar'>جستجوی فعالیت</label>
            <input type="text" id='searchbar' ref={inputElement} value={searchbarValue} onChange={searchbarFilterFunction}></input>
            </span>

            { Loading ? <h1>...loading</h1> :
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
            }

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