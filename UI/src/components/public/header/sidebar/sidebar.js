import { Fragment } from 'react';
import './sidebar.css'
import Logo from '../../logo/logo';
import Menu from '../menu/menu';
import Button from '../../../UI/button/button';
import Backdrop from '../../../UI/backdrop/backdrop';

const Sidebar = (props)=>{
    return(
        <Fragment>
            <Backdrop show={props.show} close={props.close}/>
            <div className={props.show?"sidebar open":"sidebar close"}>
                <Logo/>
                <Button btnType='success'>ورود</Button>
                <Menu/>
                
            </div>
        </Fragment>
    )
}

export default Sidebar;