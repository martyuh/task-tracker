import PropTypes from 'prop-types'
import Button from './Button'

import {useLocation} from 'react-router-dom'

// destructure the props title, and onAdd function from the app that will fire an inline function in app.js when the add button is clicked
const Header = ({title,onAdd, showAdd}) => {
   // allows you to look at the route that you're currently on
   const location =useLocation()


    return (
        <header className='header'>
            <h1>{title}</h1>
            {/* use a simple ternary which will use the uselocation hook, which allows you to set a desired route to match in order to display the button */}
            {location.pathname==='/'&&<Button 
            // boolean showAdd prop passed in from app component
            color={showAdd?'red':'green'}
            text={showAdd?'Close':'Add'}
            onClick={onAdd}   
            />}
        </header>
    )
}

export default Header

Header.defaultProps = {
    title: 'Tasks Tracker'
}

Header.prototypes ={
    title: PropTypes.string.isRequired
}