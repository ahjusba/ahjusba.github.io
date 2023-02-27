import { Link, useMatch, useResolvedPath } from "react-router-dom"

const Navbar = () => {
  return(
    <nav className="nav">
      <Link to="/" className="site-title">
        humble-web-projects
      </Link>
      <ul>
        <CustomLink to="/tic-tac-toe">tic-tac-toe</CustomLink>
        <CustomLink to="/circlemania">circlemania</CustomLink>
      </ul>
    </nav>
  )
}

const CustomLink = ({to, children, ...props}) => {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({path: resolvedPath.pathname, end: true})

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

export default Navbar