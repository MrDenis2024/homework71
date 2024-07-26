import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

const Admin = () => {
  const navigate = useNavigate();
  const {pathname: location} = useLocation();

  useEffect(() => {
    if(location === '/admin') {
      navigate('/admin/dishes');
    }
  }, [location, navigate]);

  return (
    <>
      <Outlet/>
    </>
  );
};

export default Admin;