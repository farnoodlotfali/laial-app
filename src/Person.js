import { useContext, useEffect } from 'react';
import appContext from './contexts/appContext';
import './Person.css';
import Spinner from './spinner/Spinner';
import RowItem from './RowItem';
import { useParams } from 'react-router';
const Person = () => {
  const { personList, getPerson, personkSlug, loading } = useContext(
    appContext
  );

  let params = useParams();

  useEffect(() => {
    if (personkSlug !== params.slug) {
      getPerson(params.slug);
    }
    // eslint-disable-next-line
  }, [params.slug]);
  // console.log(personList);
  return loading ? (
    <Spinner />
  ) : (
    <div className='person'>
      <div className='person__img mp-4'>
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
      <div className='person__items'>
        {personList &&
          personList?.map((item, i) => {
            return (
              <RowItem
                key={item.id}
                logo={item.image}
                media={item.media[0]}
                person={item.person}
                slug={item.slug}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Person;
