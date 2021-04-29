import { useLocation, Link } from 'react-router-dom';
import { Menu, Breadcrumb } from 'semantic-ui-react'

function Header() {
  const location = useLocation();

  return (
    <Menu>
      <Menu.Item as={Link} to="/" header>/</Menu.Item>
      <Menu.Item style={{ flexGrow: 1 }}>
        <Breadcrumb>
          {location.pathname.split('/').slice(1).map((path, index, array) => [
            <Breadcrumb.Divider key={`${path}-divider`}/>,
            <Breadcrumb.Section key={`${path}`}>
              <Link to={`${array.slice(0, index).join('/')}/${path}`}>{path}</Link>
            </Breadcrumb.Section>
          ])}
        </Breadcrumb>
      </Menu.Item>
    </Menu>
  )
}

export default Header;
