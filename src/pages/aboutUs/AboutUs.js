import { useContext, useEffect } from "react";
import authContext from "../../auth/authContext";

import NotFound from "../notFound/NotFound";

const AboutUs = () => {
  const { user } = useContext(authContext);
  useEffect(() => {
    // loadUser();
  }, [user]);
  // console.log(slug);
  return (
    <div>
      <NotFound />
    </div>
  );
};

export default AboutUs;
