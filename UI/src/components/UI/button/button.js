import './button.css';

const Button = (props)=>{
    let classes=["button"]
    switch (props.btnType) {
        case "danger":
                classes.push("danger")
            break;
        case "success":
                classes.push("success")
            break;
        default:
            break;
    }
    return(
        <button
            className={props.className+' '+classes.join(' ')}
            onClick={props.clicked}
        >
            {props.children}
        </button>
    )
}

export default Button;