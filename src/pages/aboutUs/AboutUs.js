import { useContext, useEffect } from "react";
import authContext from "../../auth/authContext";
// eslint-disable-next-line
// import Navigation from './Navigation';
import NotFound from "../notFound/NotFound";

const AboutUs = () => {
  const { user } = useContext(authContext);
  useEffect(() => {
    // loadUser();
    // eslint-disable-next-line
  }, [user]);
  // console.log(slug);
  return (
    <div>
      {/* <Navigation /> */}
      <NotFound />
      {/* <div className="" style={{ height: "500px" }}></div> */}
    </div>
  );
};

export default AboutUs;
