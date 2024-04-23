import * as React from "react";
const Bookmark = ({ color = "currentColor", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    viewBox="0 0 50 50"
    fill={color}
    {...props}
  >
    <path d="M12.813 2A1 1 0 0 0 12 3v44a.997.997 0 0 0 .496.871.993.993 0 0 0 1.004.004L25 41.156l11.5 6.719c.313.18.695.18 1.004-.004.309-.18.5-.512.496-.871V3c0-.55-.45-1-1-1H12.812ZM14 4h22v41.25l-10.5-6.125a.995.995 0 0 0-1 0L14 45.25Z" />
  </svg>
);
export default Bookmark;
