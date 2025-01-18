import { Fragment } from 'react';
import './modal.css'
import Backdrop from '../backdrop/backdrop';

const Modal = (props)=>{
    return(
        <Fragment>
            <Backdrop show={props.showModal} close={props.close}/>
            <div className='modal' style={{transform:props.showModal?'translateY(0)':'translateY(-200vh)',
                                            opacity:props.showModal?'1':'0'}}>
                {props.children}
            </div>
        </Fragment>
        
    )
}

export default Modal;