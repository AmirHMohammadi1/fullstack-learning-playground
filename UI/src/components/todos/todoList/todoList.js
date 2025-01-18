import './todoList.css'
import Button from '../../UI/button/button'
import {memo} from 'react';
// import { Link } from 'react-router';
import { useNavigate as Navigate } from 'react-router';


const todoList= (props , history)=>{
    // const locatinon = useLocation;
    // locatinon.state = 'amir';
    // console.log(locatinon.state)
    let navigate = Navigate()
    const edit = ()=>{navigate("/edit-todo/"+props.id)}
    return (
        <div>
            <label>فعالیت : {props.id}</label>
            {/* <h4 className='todo-list-label'>{props.todoTitle}</h4> */}
            <input type='text' value={props.todoTitle} disabled></input>
            {/* <Link to={"/edit-todo/"+props.id}>
                <Button className="listBtn" btnType="success" >و</Button>
            </Link> */}
            {/* ? برای استفاده از کامپوننت دکمه ای که تعریف کردیم و عملکرد کلیک باید پاس داده شود ، 
            در این حالت نمیتوان از کلیک استفاده کرد */}
            <Button className="listBtn" btnType="success" clicked={edit}>و</Button>
            {/* <button onClick={edit}>edit</button> */}
            <Button className="listBtn" btnType="danger" clicked={props.delete}>ح</Button>
        </div>
        
    )
}

export default memo(todoList)