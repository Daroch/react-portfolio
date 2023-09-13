import React from "react";
import {Link} from "react-router-dom";

export default function(props) {
  const {id, name, url, thumb_image_url, logo_url, description} = props.item;
  return (
    <div className="portfolio-item-wrapper">
      <div className="portfolio-img-background" style={{
        backgroundImage: "url(" + thumb_image_url + ")"
      }} />
      <div className="image-text-wrapper">
        <div className="logo-wrapper">
        <img src={logo_url} />
        </div>
        <div className="subtitle">{description}</div>
      </div>
    </div>
  );
}
