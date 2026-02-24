import { useState } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    });
  }

  return (
    <div className="fixed top-0 left-0 z-[60] h-[3px] w-full">
      <div className="scroll-progress h-full transition-all duration-150" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ScrollProgress;
