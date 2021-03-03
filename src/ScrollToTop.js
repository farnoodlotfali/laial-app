import { useContext } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import appContext from './contexts/appContext';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const { ChangeShowLeft, showLeft, ChangeshowCenter, showCenter } = useContext(
    appContext
  );
  useEffect(() => {
    window.scrollTo(0, 0);

    if (showLeft) {
      ChangeShowLeft(false);
    }
    if (showCenter) {
      ChangeshowCenter();
    }
    // eslint-disable-next-line
  }, [pathname]);

  return null;
}
