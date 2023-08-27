import '../Styles/Nav.css'
import NavLogo from '../Assets/nav_logo.png'

export default function Nav() {
    return(
        <div className='NavContainer'>
            <img src={NavLogo} className='NavLogo' />
        </div>
    )
}