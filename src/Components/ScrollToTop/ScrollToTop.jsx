import { useEffect } from "react";

function ScrollToTopOnPageChange() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

export default ScrollToTopOnPageChange;
