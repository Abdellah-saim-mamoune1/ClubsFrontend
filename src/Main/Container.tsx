
import { AxiosInterceptor } from "../APIs/AxiosInterceptor";
import { ClientContainer } from "./ClientContainer";


export function Container() {
     AxiosInterceptor();
    return  <ClientContainer />
}
