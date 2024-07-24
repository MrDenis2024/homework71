import {NavLink, useLocation} from 'react-router-dom';

const Toolbar = () => {
  const {pathname: location} = useLocation();
  const isAdmin = location.startsWith('/admin');

  return (
    <nav className='navbar navbar-dark bg-success'>
      <div className='container'>
        <NavLink to={isAdmin ? '/admin/dishes' : '/'} className='navbar-brand'>{isAdmin ? 'Turtle Pizza Admin' : 'Turtle Pizza'}</NavLink>
        {isAdmin &&
          <ul className='navbar-nav d-flex flex-row gap-3 flex-nowrap'>
            <li className='nav-item'>
              <NavLink to="/admin/dishes" className='nav-link'>Dishes</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to="/admin/orders" className='nav-link'>Orders</NavLink>
            </li>
          </ul>
        }
      </div>
    </nav>
  );
};

export default Toolbar;