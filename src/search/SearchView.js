import { Fragment, useContext } from 'react';
import RowItem from '../RowItem';
import Spinner from '../spinner/Spinner';
import SearchContext from './searchContext';

const SearchView = () => {
  const { filtered, allSongs, loading } = useContext(SearchContext);
  return (
    <Fragment>
      {!loading ? (
        <Fragment>
          {/* {filtered !== null
            ? filtered.map((option, i) => (
                <RowItem key={i} persons={option.persons} />
              ))
            : allSongs.map((option, i) => (
                <RowItem key={i} persons={option.persons} />
              ))} */}
        </Fragment>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default SearchView;
