import Dishes from '../../components/Dishes/Dishes';
import Cart from '../../components/Cart/Cart';

const Home = () => {
  return (
    <div className='my-4'>
      <div className='col-7'>
        <Dishes />
      </div>
      <div className='cart col-4 border rounded-4 p-3'>
        <Cart />
      </div>
    </div>
  );
};

export default Home;