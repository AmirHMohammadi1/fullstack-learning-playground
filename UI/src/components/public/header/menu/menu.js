import './menu.css'
import MenuItem from './menuitem/menuitem';
const Menu = ()=>{
    return(
        <nav className='navbar'>
            <ul className='navbarmenu'>
                <MenuItem link='/'>
                    خانه
                </MenuItem>
                <MenuItem link={{
                    pathname:'/add-todo',
                    search:'?sort=name',
                    hash:'#the-hash',
                    state:{'state':true}
                }} >
                    افزودن
                </MenuItem>
            </ul>
        </nav>
    )
}

export default Menu;