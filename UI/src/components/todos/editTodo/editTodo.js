import './editTodo.css';
import Button from '../../UI/button/button';

const EditTodo=(props)=>{
    const{HtodoTitle , HtodoStart , HtodoTime , HtodoPr} = props
    console.log(props.params.id)
    return(
        <div className='edittodo edittodo-twoColumn' >
            <h2>ویرایش فعالیت</h2>
            {/* <label>شماره دانش آموزی : </label> */}
            <label>عنوان</label>
            <input type='text' value={props.todoTitle} onChange={HtodoTitle}></input>

            <label>ساعت شروع</label>
            <input type='text' value={props.todoStart} onChange={HtodoStart}></input>

            <label>زمان مورد نیاز</label>
            <input type='text' id='phone' value={props.todoTime} onChange={HtodoTime}></input>

            <label>توضیحات</label>
            <input type='text' value={props.todoPr} onChange={HtodoPr}></input>

            <Button btnType="success" clicked={props.addtodo}>ثبت تغییرات</Button>
        </div>
    );
}

export default EditTodo;