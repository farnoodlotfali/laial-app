import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo1 from './assets/0.jpg';
import authContext from './auth/authContext';
import './PersonItem.css';
const PersonItem = ({ id, image, name, slug }) => {
  const { testAuth } = useContext(authContext);

  return (
    <div className='personItem'>
      <img className='rounded-circle' src={logo1} alt='logo' />
      <Link
        to={`/person/${slug}`}
        className='personItem__visit '
        onClick={() => testAuth()}
      >
        <h4 className='personItem__person text-center my-3'>
          {/* حاج محمد شریفی */}
          {name}
        </h4>
      </Link>
    </div>
  );
};

export default PersonItem;
