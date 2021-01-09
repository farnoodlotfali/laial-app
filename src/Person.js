import React from 'react';
import './Person.css';
const Person = () => {
  return (
    <div className='person'>
      <div className='person__img my-4'>
        <img
          src='https://www.ganja2music.com/Image/Post/10.2020/Behnam%20Bani%20-%20Khoshhalam.jpg'
          alt=''
        />
      </div>
      <div className='person__info text-light mb-5'>
        <div className='my-2'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, in
          incidunt? At.
        </div>
        <div className='my-2'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate
          suscipit accusamus vitae laboriosam perspiciatis labore cum modi
          officiis similique sapiente nesciunt non sint corrupti aliquid, error
          explicabo. Est, id magnam?
        </div>
      </div>
    </div>
  );
};

export default Person;
