import { useState } from 'react';
import './toolbar.css'
import Logo from '../../logo/logo';
import Menu from '../menu/menu';
import Button from '../../../UI/button/button'
import Modal from '../../../UI/modal/modal';
import Signin from '../../../user/signin';
import Sidebar from '../sidebar/sidebar'

const Toolbar = ()=>{
    const[showModal,setShowModal]=useState(false)
    const modalHandler = ()=>{
        setShowModal(true)
    }
    const closeModal = ()=>{
        setShowModal(false)
    }

    const[showSidebar,setShowSidebar]=useState(false)
    const sidebarHandler = ()=>{
        setShowSidebar(true)
    }
    const closesSidebar = ()=>{
        setShowSidebar(false)
    }

    return(
        <header className="toolbar">
            
            <div className='hambergericon' onClick={sidebarHandler}>hamberger Icon</div>
            <Sidebar show={showSidebar} close={closesSidebar}/>

            <Logo />
            <Menu />
            <Button btnType='success' clicked={modalHandler}>
                ورود
            </Button>
            {/* {
                // ? فقط برای آموزش این نوع شرط
                showModal?
                <Modal>
                    <Signin />
                </Modal>:null
            } */}

            <Modal showModal={showModal} close={closeModal}>
                <Signin />
            </Modal>
            

        </header>
        
    )
}

export default Toolbar;