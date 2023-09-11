import React from "react";
import {Link} from "react-router-dom";

export default function(props) {

  const {id, description, logo, thumb_image_url, url, name} = props.item;
  return (
    <div>
      <h3>{name}</h3>
      <h3>{description}</h3>
      <img src={thumb_image_url} />
      <img src={logo} />
      <h4><Link to={`/portfolio/${id}`}>{name}</Link></h4>
    </div>
  );
}
