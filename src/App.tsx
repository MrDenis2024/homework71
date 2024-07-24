import './App.css';
import {Route, Routes} from 'react-router-dom';
import Layout from './components/Layout/Layout';

const App = () => {

  return (
    <Layout>
      <Routes>
        <Route path='*' element={<div className="text-center mt-5"><strong>Данной страницы не найдено вернитесь
          пожалуйста обратно!</strong></div>} />
      </Routes>
    </Layout>
  );
};

export default App;
