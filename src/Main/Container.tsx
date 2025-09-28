import { useAppSelector } from "../Slices/Hooks";
import { ClientContainer } from "./ClientContainer";
import { EmployeeContainer } from "./EmployeeContainer";

export function Container() {
  const userType = useAppSelector(s=>s.EmployeeSlice.UserType);

  
  if (userType === "Client") {
    return  <ClientContainer />
  }

  return <EmployeeContainer/>;
}
