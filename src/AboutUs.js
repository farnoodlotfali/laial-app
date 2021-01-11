import React from 'react';
import Navigation from './Navigation';
import NotFound from './NotFound';

const AboutUs = (slug = 'sl') => {
  console.log(slug);
  return (
    <div>
      <Navigation />
      <NotFound />
    </div>
  );
};

export default AboutUs;
