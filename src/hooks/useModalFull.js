import { useEffect, useState } from "react"

const useModalFull = () => {
  const [full, setFull] = useState(false)
  
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth <= 800 ? setFull(true) : setFull(false)
    );
  }, []);
    
  return [full]
    
}

export default useModalFull