import {Link} from 'react-router-dom';
import Dishes from '../../components/Dishes/Dishes';

const AdminDishes = () => {
  return (
    <div className='mt-5'>
      <div className='d-flex justify-content-between align-items-center'>
        <h2>Dishes</h2>
        <Link to="/admin/new-dish" className='btn btn-success'>Add new Dish</Link>
      </div>
      <div className='my-3'>
        <Dishes />
      </div>
    </div>
  );
};

export default AdminDishes;