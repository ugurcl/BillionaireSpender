import { useEffect } from "react";

export function useInfiniteScroll(callback: () => void) {
  useEffect(() => {
    const handlerScroll = () => {
       
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        callback();
         console.log('scroll')
      }
    };
    window.addEventListener("scroll", handlerScroll);

    return () => window.removeEventListener("scroll", handlerScroll);
  }, [callback]);
}
