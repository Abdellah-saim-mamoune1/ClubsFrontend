import { Navigate, Route, Routes } from "react-router-dom";
import TopNav from "../ClientPages/MainPages/TopNav";
import { Home } from "../ClientPages/MainPages/Home";
import { Contact} from "../ClientPages/MainPages/Contact";
import { About } from "../ClientPages/MainPages/About";
import { History } from "../ClientPages/Discover/History";
import { Detail } from "../ClientPages/Product/Detail";
import { Art } from "../ClientPages/Discover/Art";
import { Astronomy } from "../ClientPages/Discover/Astronomy";
import { Autobiography } from "../ClientPages/Discover/Autobiography";
import { Biography } from "../ClientPages/Discover/Biography";
import { Fantasy } from "../ClientPages/Discover/Fantasy";
import { Mystery } from "../ClientPages/Discover/Mystery";
import { Philosophy } from "../ClientPages/Discover/Philosophy";
import { Login } from "../ClientPages/MainPages/Login";
import { Cart } from "../ClientPages/MainPages/Cart";
import { Biology } from "../ClientPages/Discover/Biology";
import { Account } from "../ClientPages/MainPages/Account";
import { Orders } from "../ClientPages/MainPages/Orders";
import { SignUp } from "../ClientPages/MainPages/SignUp";
import { TokenRefresher } from "../ClientPages/MainPages/TokenRefresher";
import { SearchResults } from "../ClientPages/MainPages/SearchResults";
import { Club } from "../ClientPages/MainPages/Club";
export  function ClientContainer(){
      
   
return (
    <div className="w-full h-full flex flex-col min-h-screen">
        <TokenRefresher/>
     <TopNav />

       <div className="flex-1 h-full overflow-y-auto ">
        <Routes>
          <Route path="*" element={<Navigate to="/" />} /> 
          <Route path="/" element={<Home />} />
         <Route path="/club/:id" element={<Club />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Detail" element={<Detail />} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/account" element={<Account />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/searchresult" element={<SearchResults />} />
          <Route path="/Art" element={<Art />} />
          <Route path="/Astronomy" element={<Astronomy />} />
          <Route path="/Autobiography" element={<Autobiography />} />
          <Route path="/Biography" element={<Biography />} />
          <Route path="/Fantasy" element={<Fantasy  />} />
          <Route path="/Mystery" element={<Mystery  />} />
          <Route path="/Philosophy" element={<Philosophy />} />
          <Route path="/Spirituality" element={<Fantasy  />} />
          <Route path="/Mystery" element={<Mystery  />} />
          <Route path="/History" element={<History  />} />
            <Route path="/Biology" element={<Biology  />} />
        </Routes>
      </div>

     
    </div>
  );
       

}
