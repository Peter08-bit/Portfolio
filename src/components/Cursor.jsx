import React, { useEffect, useRef } from "react";

const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      const cursor = cursorRef.current;
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed w-6 h-6 bg-purple-500/30 rounded-full pointer-events-none blur-xl z-[999]"
    ></div>
  );
};

export default Cursor;