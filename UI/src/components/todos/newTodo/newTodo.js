import './newTodo.css';
import Button from '../../UI/button/button';

const Newtodo=(props)=>{
    const{HtodoTitle , HtodoStart , HtodoTime , HtodoPr} = props
    
    return(
        <div className='newtodo newtodo-twoColumn' >
            <h2>فعالیت جدید</h2>
            {/* <label>شماره دانش آموزی : </label> */}
            <label>عنوان</label>
            <input type='text' value={props.todoTitle} onChange={HtodoTitle}></input>

            <label>ساعت شروع</label>
            <input type='text' value={props.todoStart} onChange={HtodoStart}></input>

            <label>زمان مورد نیاز</label>
            <input type='text' id='phone' value={props.todoTime} onChange={HtodoTime}></input>

            <label>توضیحات</label>
            <input type='text' value={props.todoPr} onChange={HtodoPr}></input>

            <Button btnType="success" clicked={props.addtodo}>اضافه کردن</Button>
        </div>
    );
}

export default Newtodo;