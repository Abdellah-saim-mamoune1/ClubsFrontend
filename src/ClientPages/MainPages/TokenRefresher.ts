import { useEffect } from "react";
import { useAppDispatch } from "../../Slices/Hooks";
import { RefreshClientTokens2 } from "../../APIs/ClientAPIs";

export function TokenRefresher() {
  const dispatch = useAppDispatch();

  useEffect(() => {
   
    const interval = setInterval(() => {
     dispatch(RefreshClientTokens2());
    }, 9 * 60 * 1000); 

     dispatch(RefreshClientTokens2());

    return () => clearInterval(interval);
  }, [dispatch]);

  return null;
}
