import {Link, Navigate, Route, Routes } from "react-router-dom";
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
export  function ClientContainer(){
      
   
return (
    <div className="w-full h-full flex flex-col min-h-screen">
        <TokenRefresher/>
     <TopNav />

       <div className="flex-1 px-4 h-full overflow-y-auto py-3 md:px-10">
        <Routes>
          <Route path="*" element={<Navigate to="/" />} /> 
          <Route path="/" element={<Home />} />
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

      <footer className="bg-gray-100  border-t border-gray-300  px-6 py-3 text-sm text-gray-600  text-center">
        © {new Date().getFullYear()} Trezo Books. All rights reserved. |{" "}
        <Link to="/contact" className="text-blue-600 hover:underline">
          Contact Us
        </Link>{" "}
        |{" "}
        <Link to="/about" className="text-blue-600  hover:underline">
          About
        </Link>
      </footer>
    </div>
  );
       

}
