import React from "react";
import {Link} from "react-router-dom";

export default function(props) {
  return (
    <div>
      <h3>{props.title}</h3>
      <h3>{props.description}</h3>
      <h4><Link to={`/portfolio/${props.slug}`}>{props.title}</Link></h4>
    </div>
  );
}
