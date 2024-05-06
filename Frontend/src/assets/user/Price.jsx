import * as React from "react";
const Price = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    stroke="#000"
    strokeWidth={3}
    viewBox="0 0 64 64"
    {...props}
  >
    <path
      strokeLinecap="round"
      d="M43.12 58H20.88a2.33 2.33 0 0 1-2.33-2.33V28.89a1.15 1.15 0 0 1 .37-.85L30.73 17a1.16 1.16 0 0 1 1.56 0l12.76 11a1.18 1.18 0 0 1 .4.88V55.7a2.33 2.33 0 0 1-2.33 2.3Z"
    />
    <path
      strokeLinecap="round"
      d="M32 25.2c-4.39 0-7.95-4.31-7.95-9.62S27.61 6 32 6s8 4.3 8 9.61"
    />
    <path d="M39.78 46.88a8.1 8.1 0 1 1-1.53-13.8M22.68 38.07h13.49M22.68 43.12h11.86" />
  </svg>
);
export default Price;
