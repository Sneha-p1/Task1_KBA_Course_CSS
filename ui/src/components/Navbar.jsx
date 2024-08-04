import { Link } from 'react-router-dom';
import logo from '../assets/images/kbalogo.png'
import Logout from './Logout';
import '../App.css'; 
const Navbar = () => {
    return (
        <>
            <div className='navbar-container'>
                <div className='navbar-logo'>

                    <Link to="/" >
                        <img className='navbar-logo img' src={logo} alt="logo" />
                    </Link>

                </div>
                <div className='navbar-links'>
                    <Link to="/" className='navbar-link'>Home</Link>
                    <Link to="/courses" className='navbar-link'>Courses</Link>
                    <Link to="/contact" className='navbar-link'>Contact Us</Link>
                    <Link to="/add-course" className='navbar-link'>Add Course</Link>
                    <Logout />
                </div>
            </div>
        </>
    )
}

export default Navbar;