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
          className=" text-light moreSong  d-flex   ml-3"
        >
          <div className=" text-light title mr-3">{title}</div>
        </Link>
        <div className="d-flex  align-items-center ">
          {pageinate === true ? (
            <Link
              to={`/list/${slug}`}
              className=" text-light moreSong mr-5 d-flex   ml-3"
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
        {context.map((item, i) => {
          // console.log(item);
          return (
            <RowItem
              key={item.id}
              isRow={true}
              logo={item.image}
              media={item.media[0]}
              person={item.person}
              slug={item.slug}
              context={context}
            />
          );
        })}
      </Flickity>
    </div>
  );
};

export default RowList;
