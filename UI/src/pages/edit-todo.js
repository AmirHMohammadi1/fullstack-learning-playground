import { Fragment } from "react";
import { useParams, Navigate } from "react-router";
import EditTodo from "../components/todos/editTodo/editTodo";

const EditPage = ()=>{
    const params = useParams()
    // console.log(params.id)
    let shoudeRedirect = false
    if (params.id) {
        shoudeRedirect = true
    }
    
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