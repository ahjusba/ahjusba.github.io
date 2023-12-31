import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { bubble as Menu } from 'react-burger-menu'
import './Navbar.css'

const Navbar = () => {
  return(
    <div className={"outer-container"}>
      <Menu right >
        <CustomLink to="/">home</CustomLink>
        <CustomLink to="/circlemania">circlemania</CustomLink>
        <CustomLink to="/geoAPI">geoAPI</CustomLink>
        <CustomLink to="/tic-tac-toe">tic-tac-toe</CustomLink>
        <CustomLink to="/poker-calc">Poker Calc</CustomLink>
      </Menu>
    </div>
    
  )
}

const CustomLink = ({to, children, ...props}) => {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({path: resolvedPath.pathname, end: true})

  return (
      <Link to={to} {...props}>
        {children}
      </Link>
  )
}

export default Navbar