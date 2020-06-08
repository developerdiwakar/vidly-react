import React from "react";
const Like = (props) => {
  let classes = "fa fa-heart";
  classes = !props.liked ? classes + "-o" : classes;
  return (
    <div style={{ cursor: "pointer" }} onClick={props.onClick}>
      <i className={classes} aria-hidden="true"></i>
    </div>
  );
};

export default Like;
