import { useState } from "react";

function DisplayPage({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const handlePage = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  return (
    <div className="display-page">
      <button onClick={handlePage} className="toggle">
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

export default DisplayPage;
