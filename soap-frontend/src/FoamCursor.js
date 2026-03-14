// FoamCursor.jsx
import { useEffect } from "react";

export default function FoamCursor() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const foam = document.createElement("div");
      foam.style.position = "absolute";
      foam.style.width = "15px";
      foam.style.height = "15px";
      foam.style.borderRadius = "50%";
      foam.style.backgroundColor = "rgba(173, 216, 230, 0.7)";
      foam.style.left = e.pageX + "px";
      foam.style.top = e.pageY + "px";
      foam.style.pointerEvents = "none";
      foam.style.transform = "translate(-50%, -50%)";
      foam.style.transition = "all 0.5s ease-out";
      document.body.appendChild(foam);

      setTimeout(() => {
        foam.style.transform = "translate(-50%, -50%) scale(2)";
        foam.style.opacity = "0";
      }, 50);

      setTimeout(() => {
        document.body.removeChild(foam);
      }, 600);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null;
}
