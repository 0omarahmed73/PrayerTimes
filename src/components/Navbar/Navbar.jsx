import { Container } from 'react-bootstrap'
import style from './Navbar.module.css'
import logo from '/icons8-mosque-100.png'
import { useContext } from 'react'
import { PrayersContext } from '../../context/PrayersContext'
import usa from '/Bandera-USA.svg'
import egypt from '/egypt.svg'
import { Link, NavLink } from 'react-router-dom'
const Navbar = () => {
  const {language} = useContext(PrayersContext)
  return (
    <div className={style.navAll}>
      <Container className='d-flex align-items-center justify-content-between'>
        <Link to='/'className={style.logo}>
        <div className={style.img}>
        <img src={logo} alt="" />
        </div>
        <h4 className="text-white mb-0">{language === 'ar' ? 'مواقيت الصلاة' : "Prayer Times"}</h4>
        </Link>
        <div className={style.icons}>
        <NavLink to='/en' className={style.usa}>
        <img src={usa} className={style.usaImg} alt="" />
        </NavLink>
        <NavLink to='/ar' className={style.egypt}>
        <img src={egypt} className={style.egyptImg} alt="" />
        </NavLink>
        </div>
      </Container>
    </div>
  )
}

export default Navbar