import './App.css';
import {Route, Routes} from 'react-router-dom';
import Admin from './containers/Admin/Admin';
import Layout from './components/Layout/Layout';
import AdminDishes from './containers/AdminDishes/AdminDishes';
import NewDish from './containers/NewDish/NewDish';
import EditDish from './containers/EditDish/EditDish';
import Home from './containers/Home/Home';
import Orders from './containers/Orders/Orders';

const App = () => {

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />}>
          <Route path='dishes' element={<AdminDishes />}/>
          <Route path='orders' element={<Orders />}/>
        </Route>
        <Route path='/admin/dishes/new-dish' element={<NewDish />} />
        <Route path='/admin/dishes/edit-dish/:id' element={<EditDish />} />
        <Route path='*' element={<div className="text-center mt-5"><strong>Данной страницы не найдено вернитесь
          пожалуйста обратно!</strong></div>} />
      </Routes>
    </Layout>
  );
};

export default App;
