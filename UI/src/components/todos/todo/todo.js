
import './todo.css';
import Button from '../../UI/button/button';
import { memo } from 'react';

const todo=(props)=>{
    let classes = ["todo"]
    if (props.toggler) {
        classes.push("todo-twoColumn")
    }
    return(
        <div className={classes.join(" ")} >
            <label className='todoNumber'>فعالیت : {props.id}</label>
            <span className='formItemCountainer'>
                <label>عنوان</label>
                <input type='text' value={props.todoTitle} onChange={props.titleChange}></input>
            </span>
            
            <span className='formItemCountainer'>
                <label>ساعت شروع</label>
                <input type='text' value={props.todoStart} onChange={props.startChange}></input>
            </span>
            
            <span className='formItemCountainer'>
                <label>زمان مورد نیاز</label>
                <input type='text' value={props.todoTime} onChange={props.timeChange}></input>
            </span>
            
            <span className='formItemCountainer'>
                <label>توضیح</label>
                <input type='text' value={props.todoPr} onChange={props.prChange}></input>
            </span>
            

            <Button className="todoButton" btnType="success" >ویرایش</Button>
            <Button className="todoButton" btnType="danger" clicked={props.delete}>حذف</Button>
        </div>
    );
}

export default memo(todo);