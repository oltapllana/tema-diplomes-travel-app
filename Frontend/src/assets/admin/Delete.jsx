import * as React from "react";
const Delete = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#C5CEE0"
      fillRule="evenodd"
      d="M8.333 13.333a.836.836 0 0 1-.833.834.836.836 0 0 1-.833-.834V10c0-.458.375-.833.833-.833.458 0 .833.375.833.833v3.333Zm5 0a.836.836 0 0 1-.833.834.836.836 0 0 1-.833-.834V10c0-.458.375-.833.833-.833.458 0 .833.375.833.833v3.333Zm1.667 2.5c0 .46-.373.834-.833.834H5.833A.834.834 0 0 1 5 15.833V6.667h10v9.166ZM8.333 3.607c0-.13.179-.274.417-.274h2.5c.238 0 .417.145.417.274V5H8.333V3.607ZM17.5 5h-4.167V3.607c0-1.07-.934-1.94-2.083-1.94h-2.5c-1.15 0-2.083.87-2.083 1.94V5H2.5a.836.836 0 0 0-.833.833c0 .459.375.834.833.834h.833v9.166c0 1.379 1.122 2.5 2.5 2.5h8.334c1.378 0 2.5-1.121 2.5-2.5V6.667h.833a.836.836 0 0 0 .833-.834A.836.836 0 0 0 17.5 5Z"
      clipRule="evenodd"
    />
    <mask
      id="a"
      width={18}
      height={18}
      x={1}
      y={1}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M8.333 13.333a.836.836 0 0 1-.833.834.836.836 0 0 1-.833-.834V10c0-.458.375-.833.833-.833.458 0 .833.375.833.833v3.333Zm5 0a.836.836 0 0 1-.833.834.836.836 0 0 1-.833-.834V10c0-.458.375-.833.833-.833.458 0 .833.375.833.833v3.333Zm1.667 2.5c0 .46-.373.834-.833.834H5.833A.834.834 0 0 1 5 15.833V6.667h10v9.166ZM8.333 3.607c0-.13.179-.274.417-.274h2.5c.238 0 .417.145.417.274V5H8.333V3.607ZM17.5 5h-4.167V3.607c0-1.07-.934-1.94-2.083-1.94h-2.5c-1.15 0-2.083.87-2.083 1.94V5H2.5a.836.836 0 0 0-.833.833c0 .459.375.834.833.834h.833v9.166c0 1.379 1.122 2.5 2.5 2.5h8.334c1.378 0 2.5-1.121 2.5-2.5V6.667h.833a.836.836 0 0 0 .833-.834A.836.836 0 0 0 17.5 5Z"
        clipRule="evenodd"
      />
    </mask>
  </svg>
);
export default Delete;
