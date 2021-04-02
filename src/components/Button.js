import PropTypes from 'prop-types'


const Button = ({color,text,onClick}) => {
    return (
        <div>
            <button 
            // onClick function passed from header passed from Header
            onClick={onClick}
            style={{backgroundColor: color}} 
            className='btn'>{text}
            </button>
        </div>
    )
}

export default Button

Button.defaultProps = {
    color:'green'
    
}

Button.prototype={
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}