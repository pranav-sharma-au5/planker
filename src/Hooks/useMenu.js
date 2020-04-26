import { useState } from "react";

export default value => {

  const [anchorEl, setAnchorEl] = useState(value);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return [anchorEl, handleClick, handleClose]
}



