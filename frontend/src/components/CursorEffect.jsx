import { useEffect } from "react";
import "./CursorEffect.css";

const CursorEffect = () => {
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.classList.add("gaming-cursor");
    document.body.appendChild(cursor);

    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  return null;
};

export default CursorEffect;
