import React from "react";
import RowItem from "./RowItem";
import Flickity from "react-flickity-component";
import "./RowList.css";
import { Link } from "react-router-dom";
import { ChevronLeftRounded } from "@material-ui/icons";

const RowList = ({ id, title, slug = "", data }) => {
  const flickityOptions = {
    // initialIndex: 2,
    fullscreen: true,
    lazyLoad: 5,

    contain: true,
    prevNextButtons: false,
    pageDots: false,
    rightToLeft: true,
  };
  const { context, pageinate } = data;
  // console.log(context);
  return (
    // <div className={`rowList pb-3 mt-5 ${id === 1 ? "top__radius" : ""}`}>
    <div className={`rowList  ${id === 1 ? "top__radius" : ""}`}>
      <div
        className={`rowList__title d-flex  ${
          id === 1 ? "top__radius__rowList__title" : ""
        } `}
      >
        <Link
          to={`/list/${slug}`}
          className=" text-light rowList__moreSong  d-flex   ml-3"
        >
          <div className=" text-light title mr-3 text-nowrap">{title}</div>
        </Link>
        <div className="d-flex  align-items-center text-nowrap ">
          {pageinate === true ? (
            <Link
              to={`/list/${slug}`}
              className=" text-light rowList__moreSong  d-flex   ml-3"
            >
              <span className="rowList__showMore">نمایش همه </span>
              <ChevronLeftRounded className="align-self-center rowList__showMore__icon" />
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>

      <Flickity className="carousel col px-2 py-0" options={flickityOptions}>
        {context.map((item) => {
          // console.log(item);
          return (
            <RowItem
              key={item.id}
              postId={item.id}
              isRow={true}
              logo={item.image}
              media={item.media[0]}
              person={item.person}
              slug={item.slug}
              context={context}
              meta_description={item.meta_description}
              meta_title={item.meta_title}
              description={item.description}
              title={item.title}
            />
          );
        })}
      </Flickity>
    </div>
  );
};

export default RowList;
