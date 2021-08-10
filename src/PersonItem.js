import { useContext } from "react";
import { Link } from "react-router-dom";
import defualtPhoto from "./assets/defualtPhoto.jpeg";

import authContext from "./auth/authContext";
import "./PersonItem.css";
const PersonItem = ({ id, image, name, slug }) => {
  const { testAuth } = useContext(authContext);

  return (
    <div className="personItem ml-3">
      <Link to={`/person/${slug}`}>
        <img
          className="rounded-circle"
          src={image !== null ? image.full_image_url : defualtPhoto}
          alt=""
        />
      </Link>

      <Link
        to={`/person/${slug}`}
        className="personItem__visit "
        onClick={() => testAuth()}
      >
        <h4 className="personItem__person text-center my-3">{name}</h4>
      </Link>
    </div>
  );
};

export default PersonItem;
