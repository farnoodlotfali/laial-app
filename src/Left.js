import { IconButton, Slide, Slider, Tooltip } from '@material-ui/core';
import {
  Close,
  Delete,
  PlayArrowRounded,
  Repeat,
  Shuffle,
  SkipNextRounded,
  SkipPreviousRounded,
} from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import AppContext from './contexts/appContext';
import logo from './assets/0.jpg';
import './Left.css';

const Left = () => {
  const { showLeft, ChangeShowLeft, showCenter } = useContext(AppContext);
  const [value, setValue] = useState(33);
  //   const [open, setOpen] = useState(showLeft);
  const removeLeft = () => {
    ChangeShowLeft(false);
  };
  const changeValue = (e, newValue) => {
    setValue(newValue);
  };
  return (
    // <div className='left text-light'>
    <Slide direction='right' timeout={500} in={showLeft}>
      <div className=' p-0 playList text-light'>
        <div className='bg__gray'>
          <Close className='closeBtn' onClick={removeLeft} fontSize='large' />
          <div className='playerInfo d-flex '>
            <div className='info__image mr-3'>
              <img src={logo} alt='' />
            </div>
            <div className='info mr-3'>
              <div className='info__title mb-2'> دودمه شب دهم محرم الحرام</div>
              <div className='info__person mb-4'> حاج مهدی رسولی</div>
            </div>
          </div>
          <div className='icons d-flex justify-content-around mt-3 mb-4'>
            <div className='icon d-flex align-items-center'>
              <Shuffle style={{ fontSize: 25 }} />
            </div>
            <div className='icon  '>
              <SkipPreviousRounded style={{ fontSize: 35 }} />
            </div>
            <div className='icon  '>
              <PlayArrowRounded style={{ fontSize: 35 }} />
            </div>
            <div className='icon  '>
              <SkipNextRounded style={{ fontSize: 35 }} />
            </div>
            <div className='icon d-flex align-items-center'>
              <Repeat style={{ fontSize: 25 }} />
            </div>
          </div>
          <div className='playlist__musicBar m d-flex mb-4 mt-2 justify-content-center'>
            <div className='player__zone d-flex  col-10 p-0'>
              <div className='current-time  d-flex align-items-center'>
                01:32
              </div>
              <div className='player d-flex align-items-center mx-2'>
                <Slider
                  variant='determinate'
                  value={value}
                  onChange={changeValue}
                />
              </div>
              <div className='last-time d-flex align-items-center'>07:24</div>
            </div>
          </div>
        </div>
        <div className='songs container'>
          <div className='song d-flex my-5 ml-4 justify-content-between'>
            <div className='song__right d-flex'>
              <div className='number mx-4 align-self-center'>1</div>
              <div className='song__image'>
                <img src={logo} alt='' />
              </div>
              <div className='song__info mr-3 align-self-center '>
                <div className='song__title'>دودمه شب دهم محرم الحرام</div>
                <div className='song__person'>حاج مهدی رسولی</div>
              </div>
            </div>
            <div className='song__left d-flex'>
              <div className='song__time align-self-center text-muted'>
                3:49
              </div>
              <div className='deleteSongBtn align-self-center mr-1'>
                <Tooltip placement='right' title='Delete'>
                  <IconButton aria-label='delete' color='inherit'>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className='song d-flex my-5 ml-4 justify-content-between'>
            <div className='song__right d-flex'>
              <div className='number mx-4 align-self-center'>1</div>
              <div className='song__image'>
                <img src={logo} alt='' />
              </div>
              <div className='song__info mr-3 align-self-center '>
                <div className='song__title'>دودمه شب دهم محرم الحرام</div>
                <div className='song__person'>حاج مهدی رسولی</div>
              </div>
            </div>
            <div className='song__left d-flex'>
              <div className='song__time align-self-center text-muted'>
                3:49
              </div>
              <div className='deleteSongBtn align-self-center mr-1'>
                <Tooltip placement='right' title='Delete'>
                  <IconButton aria-label='delete' color='inherit'>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className='song d-flex my-5 ml-4 justify-content-between'>
            <div className='song__right d-flex'>
              <div className='number mx-4 align-self-center'>1</div>
              <div className='song__image'>
                <img src={logo} alt='' />
              </div>
              <div className='song__info mr-3 align-self-center '>
                <div className='song__title'>دودمه شب دهم محرم الحرام</div>
                <div className='song__person'>حاج مهدی رسولی</div>
              </div>
            </div>
            <div className='song__left d-flex'>
              <div className='song__time align-self-center text-muted'>
                3:49
              </div>
              <div className='deleteSongBtn align-self-center mr-1'>
                <Tooltip placement='right' title='Delete'>
                  <IconButton aria-label='delete' color='inherit'>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className='song d-flex my-5 ml-4 justify-content-between'>
            <div className='song__right d-flex'>
              <div className='number mx-4 align-self-center'>1</div>
              <div className='song__image'>
                <img src={logo} alt='' />
              </div>
              <div className='song__info mr-3 align-self-center '>
                <div className='song__title'>دودمه شب دهم محرم الحرام</div>
                <div className='song__person'>حاج مهدی رسولی</div>
              </div>
            </div>
            <div className='song__left d-flex'>
              <div className='song__time align-self-center text-muted'>
                3:49
              </div>
              <div className='deleteSongBtn align-self-center mr-1'>
                <Tooltip placement='right' title='Delete'>
                  <IconButton aria-label='delete' color='inherit'>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className='song d-flex my-5 ml-4 justify-content-between'>
            <div className='song__right d-flex'>
              <div className='number mx-4 align-self-center'>1</div>
              <div className='song__image'>
                <img src={logo} alt='' />
              </div>
              <div className='song__info mr-3 align-self-center '>
                <div className='song__title'>دودمه شب دهم محرم الحرام</div>
                <div className='song__person'>حاج مهدی رسولی</div>
              </div>
            </div>
            <div className='song__left d-flex'>
              <div className='song__time align-self-center text-muted'>
                3:49
              </div>
              <div className='deleteSongBtn align-self-center mr-1'>
                <Tooltip placement='right' title='Delete'>
                  <IconButton aria-label='delete' color='inherit'>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className='song d-flex my-5 ml-4 justify-content-between'>
            <div className='song__right d-flex'>
              <div className='number mx-4 align-self-center'>1</div>
              <div className='song__image'>
                <img src={logo} alt='' />
              </div>
              <div className='song__info mr-3 align-self-center '>
                <div className='song__title'>دودمه شب دهم محرم الحرام</div>
                <div className='song__person'>حاج مهدی رسولی</div>
              </div>
            </div>
            <div className='song__left d-flex'>
              <div className='song__time align-self-center text-muted'>
                3:49
              </div>
              <div className='deleteSongBtn align-self-center mr-1'>
                <Tooltip placement='right' title='Delete'>
                  <IconButton aria-label='delete' color='inherit'>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className='song d-flex my-5 ml-4 justify-content-between'>
            <div className='song__right d-flex'>
              <div className='number mx-4 align-self-center'>1</div>
              <div className='song__image'>
                <img src={logo} alt='' />
              </div>
              <div className='song__info mr-3 align-self-center '>
                <div className='song__title'>دودمه شب دهم محرم الحرام</div>
                <div className='song__person'>حاج مهدی رسولی</div>
              </div>
            </div>
            <div className='song__left d-flex'>
              <div className='song__time align-self-center text-muted'>
                3:49
              </div>
              <div className='deleteSongBtn align-self-center mr-1'>
                <Tooltip placement='right' title='Delete'>
                  <IconButton aria-label='delete' color='inherit'>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className='song d-flex my-5 ml-4 justify-content-between'>
            <div className='song__right d-flex'>
              <div className='number mx-4 align-self-center'>1</div>
              <div className='song__image'>
                <img src={logo} alt='' />
              </div>
              <div className='song__info mr-3 align-self-center '>
                <div className='song__title'>دودمه شب دهم محرم الحرام</div>
                <div className='song__person'>حاج مهدی رسولی</div>
              </div>
            </div>
            <div className='song__left d-flex'>
              <div className='song__time align-self-center text-muted'>
                3:49
              </div>
              <div className='deleteSongBtn align-self-center mr-1'>
                <Tooltip placement='right' title='Delete'>
                  <IconButton aria-label='delete' color='inherit'>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className='song d-flex my-5 ml-4 justify-content-between'>
            <div className='song__right d-flex'>
              <div className='number mx-4 align-self-center'>1</div>
              <div className='song__image'>
                <img src={logo} alt='' />
              </div>
              <div className='song__info mr-3 align-self-center '>
                <div className='song__title'>دودمه شب دهم محرم الحرام</div>
                <div className='song__person'>حاج مهدی رسولی</div>
              </div>
            </div>
            <div className='song__left d-flex'>
              <div className='song__time align-self-center text-muted'>
                3:49
              </div>
              <div className='deleteSongBtn align-self-center mr-1'>
                <Tooltip placement='right' title='Delete'>
                  <IconButton aria-label='delete' color='inherit'>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className='song d-flex my-5 ml-4 justify-content-between'>
            <div className='song__right d-flex'>
              <div className='number mx-4 align-self-center'>1</div>
              <div className='song__image'>
                <img src={logo} alt='' />
              </div>
              <div className='song__info mr-3 align-self-center '>
                <div className='song__title'>دودمه شب دهم محرم الحرام</div>
                <div className='song__person'>حاج مهدی رسولی</div>
              </div>
            </div>
            <div className='song__left d-flex'>
              <div className='song__time align-self-center text-muted'>
                3:49
              </div>
              <div className='deleteSongBtn align-self-center mr-1'>
                <Tooltip placement='right' title='Delete'>
                  <IconButton aria-label='delete' color='inherit'>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className='song d-flex my-5 ml-4 justify-content-between'>
            <div className='song__right d-flex'>
              <div className='number mx-4 align-self-center'>1</div>
              <div className='song__image'>
                <img src={logo} alt='' />
              </div>
              <div className='song__info mr-3 align-self-center '>
                <div className='song__title'>دودمه شب دهم محرم الحرام</div>
                <div className='song__person'>حاج مهدی رسولی</div>
              </div>
            </div>
            <div className='song__left d-flex'>
              <div className='song__time align-self-center text-muted'>
                3:49
              </div>
              <div className='deleteSongBtn align-self-center mr-1'>
                <Tooltip placement='right' title='Delete'>
                  <IconButton aria-label='delete' color='inherit'>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className='song d-flex my-5 ml-4 justify-content-between'>
            <div className='song__right d-flex'>
              <div className='number mx-4 align-self-center'>1</div>
              <div className='song__image'>
                <img src={logo} alt='' />
              </div>
              <div className='song__info mr-3 align-self-center '>
                <div className='song__title'>دودمه شب دهم محرم الحرام</div>
                <div className='song__person'>حاج مهدی رسولی</div>
              </div>
            </div>
            <div className='song__left d-flex'>
              <div className='song__time align-self-center text-muted'>
                3:49
              </div>
              <div className='deleteSongBtn align-self-center mr-1'>
                <Tooltip placement='right' title='Delete'>
                  <IconButton aria-label='delete' color='inherit'>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className='song d-flex my-5 ml-4 justify-content-between'>
            <div className='song__right d-flex'>
              <div className='number mx-4 align-self-center'>1</div>
              <div className='song__image'>
                <img src={logo} alt='' />
              </div>
              <div className='song__info mr-3 align-self-center '>
                <div className='song__title'>دودمه شب دهم محرم الحرام</div>
                <div className='song__person'>حاج مهدی رسولی</div>
              </div>
            </div>
            <div className='song__left d-flex'>
              <div className='song__time align-self-center text-muted'>
                3:49
              </div>
              <div className='deleteSongBtn align-self-center mr-1'>
                <Tooltip placement='right' title='Delete'>
                  <IconButton aria-label='delete' color='inherit'>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className='song d-flex my-5 ml-4 justify-content-between'>
            <div className='song__right d-flex'>
              <div className='number mx-4 align-self-center'>1</div>
              <div className='song__image'>
                <img src={logo} alt='' />
              </div>
              <div className='song__info mr-3 align-self-center '>
                <div className='song__title'>دودمه شب دهم محرم الحرام</div>
                <div className='song__person'>حاج مهدی رسولی</div>
              </div>
            </div>
            <div className='song__left d-flex'>
              <div className='song__time align-self-center text-muted'>
                3:49
              </div>
              <div className='deleteSongBtn align-self-center mr-1'>
                <Tooltip placement='right' title='Delete'>
                  <IconButton aria-label='delete' color='inherit'>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className='song d-flex my-5 ml-4 justify-content-between'>
            <div className='song__right d-flex'>
              <div className='number mx-4 align-self-center'>1</div>
              <div className='song__image'>
                <img src={logo} alt='' />
              </div>
              <div className='song__info mr-3 align-self-center '>
                <div className='song__title'>دودمه شب دهم محرم الحرام</div>
                <div className='song__person'>حاج مهدی رسولی</div>
              </div>
            </div>
            <div className='song__left d-flex'>
              <div className='song__time align-self-center text-muted'>
                3:49
              </div>
              <div className='deleteSongBtn align-self-center mr-1'>
                <Tooltip placement='right' title='Delete'>
                  <IconButton aria-label='delete' color='inherit'>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className='song d-flex my-5 ml-4 justify-content-between'>
            <div className='song__right d-flex'>
              <div className='number mx-4 align-self-center'>1</div>
              <div className='song__image'>
                <img src={logo} alt='' />
              </div>
              <div className='song__info mr-3 align-self-center '>
                <div className='song__title'>دودمه شب دهم محرم الحرام</div>
                <div className='song__person'>حاج مهدی رسولی</div>
              </div>
            </div>
            <div className='song__left d-flex'>
              <div className='song__time align-self-center text-muted'>
                3:49
              </div>
              <div className='deleteSongBtn align-self-center mr-1'>
                <Tooltip placement='right' title='Delete'>
                  <IconButton aria-label='delete' color='inherit'>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slide>
    /* </div> */
  );
};

export default Left;
