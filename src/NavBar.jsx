import { useRef } from "react";
import { useKey } from "./useKey";

export default function NavBar({ query, setQuery, movies }) {
  const inputElement = useRef();
  const handleEnter = () => {
    if (document.activeElement === inputElement.current) return;
    inputElement.current.focus();
    setQuery("");
  };
  useKey("Enter", handleEnter);

  return (
    <nav className="nav-bar">
      <h2>Destiny Flix</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputElement}
        placeholder="Enter your movie"
      />
      <h2>
        Found <strong style={{ color: "green" }}>{movies?.length}</strong>{" "}
        results
      </h2>
    </nav>
  );
}
