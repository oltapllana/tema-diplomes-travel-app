import * as React from "react";
const Ticket = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 12a3.001 3.001 0 0 0-2-2.83V7.6c0-.56 0-.84.109-1.054a1 1 0 0 1 .437-.437C3.76 6 4.04 6 4.6 6h14.8c.56 0 .84 0 1.054.109a1 1 0 0 1 .437.437C21 6.76 21 7.04 21 7.6v1.57a3.002 3.002 0 0 0 0 5.66v1.57c0 .56 0 .84-.109 1.054a1 1 0 0 1-.437.437C20.24 18 19.96 18 19.4 18H4.6c-.56 0-.84 0-1.054-.109a1 1 0 0 1-.437-.437C3 17.24 3 16.96 3 16.4v-1.57A3.001 3.001 0 0 0 5 12Z"
    />
  </svg>
);
export default Ticket;
