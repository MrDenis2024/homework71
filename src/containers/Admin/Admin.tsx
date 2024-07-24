import {Outlet, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/admin/dishes');
  }, [navigate]);

  return (
    <>
      <Outlet/>
    </>
  );
};

export default Admin;