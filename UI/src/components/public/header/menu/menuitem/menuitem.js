import './menuitem.css'

import { NavLink } from 'react-router'

const MenuItem = (props)=>{
    return(
        <li className='menuitem'>
            <NavLink to={props.link} end>
                {props.children}
            </NavLink>
        </li>
    )
}

// ? with link
// import { Link } from 'react-router-dom'

// const MenuItem = (props)=>{
//     const classes = []
//     if (props.active) {
//         classes.push('active')
//     }
//     return(
//         <li className='menuitem'>
//             <Link to={props.link} className={classes}>
//                 {props.children}
//             </Link>
//         </li>
//     )
// }

export default MenuItem;