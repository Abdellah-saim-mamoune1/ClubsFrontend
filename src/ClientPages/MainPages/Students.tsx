import { useNavigate, useParams } from "react-router-dom";
import { GraduationCap, Calendar, Users } from "lucide-react";
import {  GetStudentDataByIdAsync } from "../../APIs/ClientAPIs";
import {  IGetClientInfo } from "../../Interfaces/ClientInterfaces";
import { useEffect, useState } from "react";

export function Students() {
   const { id } = useParams();
   const [clientInfo,setclientinfo] =useState<IGetClientInfo|null|false>(null);



    useEffect(()=>{
        async function Get(){
        const data=await GetStudentDataByIdAsync(Number(id));
        setclientinfo(data);
        }
        Get();
    },[])
  

  
    
  
  const navigate=useNavigate();
  if (clientInfo===null) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading account details...
      </div>
    );
  }

  if (clientInfo === false) {
    return <p className="text-center mt-10 text-gray-500">Student not found.</p>;
  }

  return (
    <div className="flex flex-col min-h-screen items-center">
      <div className="flex-1 max-w-5xl w-full py-3 px-3">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
       
          <img
                src={clientInfo.imageUrl}
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-blue-600 shadow-md object-contain bg-white"   
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">{clientInfo.fullName}</h1>
            <div className="mt-2 space-y-2 text-gray-600">
              <p className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                {clientInfo.degree} ({clientInfo.yearOfDegree})
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Age: {clientInfo.age}
              </p>
            </div>
          </div>
        </div>

        {/* Joined Clubs Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" /> Joined Clubs
          </h2>

          {clientInfo.joinedClubs.length === 0 ? (
            <p className="text-gray-500">You haven’t joined any clubs yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {clientInfo.joinedClubs.map((club) => (
                <div
                  key={club.id}
                onClick={() => navigate(`/club/${club.id}`)}
                  className="bg-white cursor-pointer rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center text-center"
                >
                  <img
                    src={club.imageUrl}
                    alt={club.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
                  />
                  <h3 className="mt-3 font-semibold text-gray-800">{club.name}</h3>
                  <p className="text-sm text-gray-600">{club.type}</p>
                  <span className="mt-2 inline-block px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                    {club.userRole}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 w-full py-10 px-6 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="font-semibold mb-2">About Us</h4>
            <p>
              We connect students through clubs, events, and activities to
              encourage collaboration and innovation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contact</h4>
            <p>Email: contact@university.com</p>
            <p>Phone: +213 555 123 456</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <a href="/clubs" className="hover:text-white transition">
                  All Clubs
                </a>
              </li>
              <li>
                <a href="/events" className="hover:text-white transition">
                  Upcoming Events
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition">
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} University Clubs. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
