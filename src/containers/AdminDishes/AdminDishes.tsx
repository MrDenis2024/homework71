import {Link} from 'react-router-dom';

const AdminDishes = () => {
  return (
    <div className='mt-5'>
      <div className='d-flex justify-content-between align-items-center'>
        <h2>Dishes</h2>
        <Link to="/admin/new-dish" className='btn btn-success'>Add new Dish</Link>
      </div>
    </div>
  );
};

export default AdminDishes;