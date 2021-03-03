import { useContext, useEffect } from 'react';
import authContext from './auth/authContext';
// import Navigation from './Navigation';
import NotFound from './NotFound';

const AboutUs = () => {
  const { user, loadUser } = useContext(authContext);
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, [user]);
  // console.log(slug);
  return (
    <div>
      {/* <Navigation /> */}
      <NotFound />
    </div>
  );
};

export default AboutUs;
