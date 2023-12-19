import { useState } from "react";

export default function Expander({
  children,
  length = 10,
  open = "Show less",
  close = "Show More",
  color = "red",
  bgColor,
  padding,
  boxShadow,
  borderRadius,
  nowOpen = false,
}) {
  //   const [textNumber, setTextNumber] = useState(children);
  const [isOpen, setIsOpen] = useState(nowOpen);
  function handleOpen() {
    setIsOpen((isopen) => !isOpen);
  }
  const bgStyle = {
    backgroundColor: bgColor,
    padding: `${padding}px`,
    boxShadow: `0px 0px ${boxShadow}px 0px`,
    borderRadius,
  };
  return (
    <div style={bgStyle}>
      {isOpen ? (
        <span>{children}</span>
      ) : (
        <span>{children.slice().split(" ").slice(0, length).join(" ")}...</span>
      )}
      <span onClick={handleOpen} style={{ cursor: "pointer", color }}>
        {isOpen ? " " + open : `${close}`}
      </span>
    </div>
  );
}
