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
    if (showLeft) {
      ChangeShowLeft(false);
    }
    if (showCenter) {
      ChangeshowCenter();
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
