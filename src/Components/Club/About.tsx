import { IClub } from "../../Interfaces/ClubsIntefaces";
import { useState } from "react";
import { NotificationCard } from "../NotificationCard";
import { Settings } from "lucide-react";
import { UpdateClubForm } from "./UpdateClubForm";
import { JoinClubForm } from "./JoinClubForm";
import { useNavigate } from "react-router-dom";

export function About({
  club,
  UserId,
  setloadclubinfo,
}: {
  club: IClub;
  UserId: number;
  setloadclubinfo: (set: boolean) => void;
}) {

  const navigate=useNavigate();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [notif, setNotif] = useState({
    show: false,
    message: "",
    isSuccess: false,
  });
  

  
  return (
    <div className="bg-white px-3 sm:px-6 py-5 rounded-xl shadow space-y-4 relative">
      {/* === Notification === */}
      <NotificationCard
        message={notif.message}
        isSuccess={notif.isSuccess}
        show={notif.show}
        onClose={() => setNotif({ ...notif, show: false })}
      />

      {/* === Header === */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">About the Club</h2>
        {club.studentRole === "Admin" && (
          <button
            onClick={() => setShowUpdateForm(true)}
            className="text-sm text-gray-800 hover:text-gray-900 font-semibold flex items-center gap-1"
          >
            <Settings className="w-5 h-5" />
            Settings
          </button>
        )}
      </div>

      <p className="text-gray-700">{club.description}</p>

      {/* === Stats === */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center mt-6">
        <div>
          <p className="text-lg font-bold text-teal-600">{club.eventsNumber}</p>
          <p className="text-sm text-gray-500">Events</p>
        </div>
        <div>
          <p className="text-lg font-bold text-teal-600">{club.membersNumber}</p>
          <p className="text-sm text-gray-500">Members</p>
        </div>
        <div>
          <p
            className={`text-lg font-bold ${
              club.openForRegistrations ? "text-green-600" : "text-red-600"
            }`}
          >
            {club.openForRegistrations ? "Open" : "Closed"}
          </p>
          <p className="text-sm text-gray-500">Registration</p>
        </div>
      </div>

      {/* === Join Button === */}
      {club.openForRegistrations && (
        <div className="flex justify-center mt-6">
          {club.joiningStatus === "NotJoined" && (
            <button
              onClick={() =>{if(UserId===-1) navigate("/login"); else{setShowJoinForm(true)}}}
              className="px-6 py-2 rounded-lg font-semibold text-white bg-teal-600 hover:bg-teal-700 transition"
            >
              Join Club
            </button>
          )}

          {club.joiningStatus === "Requested" && (
            <button
              disabled
              className="px-6 py-2 rounded-lg font-semibold bg-gray-400 text-white cursor-not-allowed"
            >
              Request Sent
            </button>
          )}

          {club.joiningStatus === "Joined" && (
            <p className="text-teal-700 font-semibold">You are a member</p>
          )}
        </div>
      )}

      {/* === Popup Update Form === */}
      {showUpdateForm && (
        <UpdateClubForm
          setNotif={setNotif}
          setShowUpdateForm={setShowUpdateForm}
          setloadclubinfo={setloadclubinfo}
          UserId={UserId}
          club={club}
        />
      )}

      {/* === Join Form Popup === */}
      {showJoinForm && (
        <JoinClubForm
          clubId={club.id}
          userId={UserId}
          setNotif={setNotif}
          setShowJoinForm={setShowJoinForm}
          setloadclubinfo={setloadclubinfo}
          onClose={() => setShowJoinForm(false)}
        />
      )}
    </div>
  );
}
