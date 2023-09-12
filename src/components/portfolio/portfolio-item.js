import React from "react";
import {Link} from "react-router-dom";

export default function(props) {
  const {id, name, url, thumb_inage_url, logo, description} = props.item;
  return (
    <div>
      <h3>{name}</h3>
      <h3>{description}</h3>
      <h4><Link to={`/portfolio/${id}`}>{name}</Link></h4>
    </div>
  );
}
