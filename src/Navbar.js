import { Link, useMatch, useResolvedPath } from "react-router-dom"

const Navbar = () => {
  return(
    <header>
      <nav className="nav">
        <Link to="/" className="site-title">
          <p id="const">const</p><p id="var"> humble-web-projects</p>
          =
          <p id="paranthesis">()</p>
          <p>{'=>'}</p>
        </Link>
        <ul>
          <CustomLink to="/circlemania">circlemania</CustomLink>
          <CustomLink to="/geoAPI">geoAPI</CustomLink>
          <CustomLink to="/tic-tac-toe">tic-tac-toe</CustomLink>
        </ul>
      </nav>
    </header>
    
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