import { Navigate, Route, Routes } from "react-router-dom";
import TopNav from "../ClientPages/MainPages/TopNav";
import { Home } from "../ClientPages/MainPages/Home";
import { Club } from "../ClientPages/MainPages/Club";
import { Event } from "../ClientPages/MainPages/Event";
import { Events } from "../ClientPages/MainPages/Events";
import { Clubs } from "../ClientPages/MainPages/Clubs";
import { useEffect, useState } from "react";
import { GetClientInfoAPI, IsStudentLoggedInAPI } from "../APIs/ClientAPIs";
import { useAppDispatch } from "../Slices/Hooks";
import { SetLoggedInState } from "../Slices/ClientSlices/ClientInfoSlice";
import { Students } from "../ClientPages/MainPages/Students";
import { Login } from "../ClientPages/MainPages/Login";
import { Account } from "../ClientPages/MainPages/Account";
import Forbidden from "../Errors/Forbidden";
import NotFound from "../Errors/NotFound";
import Unauthorized from "../Errors/Unathorized";
import ServerError from "../Errors/ServerError";

import GenericError from "../Errors/GenericError";
import NetworkError from "../Errors/NetworkError";
export  function ClientContainer(){
  const[loading,setLoading]=useState(true);
  const dispatch=useAppDispatch();
    useEffect(()=>{
    async function Check(){
     const check=await IsStudentLoggedInAPI();
     if(check){
      await dispatch(GetClientInfoAPI());
      dispatch(SetLoggedInState(true));
     }
     
       setLoading(false);
    }
    Check();
    },[])
   if(loading){
    return(
   <div className="w-full h-full flex items-center justify-center py-6">
        <div className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
   }
return (
    <div className="w-full h-full flex flex-col min-h-screen">
    
     <TopNav />

       <div className="flex-1 h-full overflow-y-auto ">
        <Routes>
          <Route path="*" element={<Navigate to="/" />} /> 
          <Route path="/" element={<Home />} />
          <Route path="/club/:id" element={<Club />} />
          <Route path="/event/:id" element={<Event />} />
          <Route path="/students/:id" element={<Students />} />
          <Route path="/events" element={<Events />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />

          {/* Error pages */}
         <Route path="/404" element={<NotFound />} />
         <Route path="/401" element={<Unauthorized />} />
         <Route path="/403" element={<Forbidden />} />
         <Route path="/500" element={<ServerError />} />
         <Route path="/network-error" element={<NetworkError />} />
         <Route path="/error" element={<GenericError />} />

        {/* Catch-all for unmatched routes */}
         <Route path="*" element={<NotFound />} />
         
        </Routes>
      </div>

     
    </div>
  );
       

}
