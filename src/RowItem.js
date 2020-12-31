import { PlayCircleFilled, PlaylistAdd } from '@material-ui/icons';
import React, { useContext } from 'react';
import { Badge } from 'react-bootstrap';
import AppContext from './contexts/appContext';
import logo1 from './assets/0.jpg';
import './RowItem.css';
const RowItem = ({
  // logo  ,
  categories = 'شب سوم محرم',
  languages = 'فارسی',
  persons = 'محمد',
  modes = 'دودمه',
  years = '2001',
}) => {
  const { ChangeShowMusic, ChangeshowCenter } = useContext(AppContext);
  return (
    <div className='carousel-cellRowItem rowItem '>
      <div className='rowItem__image'>
        <img src={logo1} alt='logo' />
        <Badge className='badge bg-light'>
          شور
          {/* {modes} */}
        </Badge>
      </div>

      <div className='rowItem__onHover'>
        <div className='rowItem__icons'>
          <div className='rowItem__icon' onClick={ChangeShowMusic}>
            <PlayCircleFilled fontSize='large' />
          </div>
          <div className='rowItem__icon' onClick={ChangeshowCenter}>
            <PlaylistAdd fontSize='large' />
          </div>
        </div>
      </div>
      <div className='rowItem__info'>
        <h4 className='rowItem__title text-center'>اهل کاشان هستم</h4>
        <h4 className='rowItem__person text-center'>
          {/* حاج محمد شریفی */}
          {persons}
        </h4>
      </div>
    </div>
  );
  // return (
  //   <div className='carousel-cell rowItem'>
  //     <img className='rowItem__photo' src={logo} alt='' />
  //   </div>
  // );
};

export default RowItem;
