import './signin.css'
import Logo from '../public/logo/logo';
import Button from '../UI/button/button';

const Signin = ()=>{
    return(
        <div className='signin'>
            <Logo/>
            <input type='text' placeholder='username' />
            <input type='password' placeholder='password' />
            <Button btnType='success'>
                ورود
            </Button>
        </div>

    )
}

export default Signin;