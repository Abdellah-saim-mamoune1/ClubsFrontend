import { useEffect } from "react";
import { useAppDispatch } from "../Slices/Hooks";
import { RefreshEmployeeTokens } from "../APIs/EmployeeAPIs";

export function EmployeeTokensRefresher() {
  const dispatch = useAppDispatch();

  useEffect(() => {
   
    const interval = setInterval(() => {
     dispatch(RefreshEmployeeTokens());
    }, 9 * 60 * 1000); 

     dispatch(RefreshEmployeeTokens());

    return () => clearInterval(interval);
  }, [dispatch]);

  return null;
}
