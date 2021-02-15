import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className='notFound'>
      <div className=' notFound__content  justify-content-center'>
        <h1 className='notfound__title my-3'>404</h1>
        <h2 className='notfound__desc '>صفحه مورد نظر یافت نشد</h2>
        <Link to='/' dideo-checked='true'>
          صفحه اصلی
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
