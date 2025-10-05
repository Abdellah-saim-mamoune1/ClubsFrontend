import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IClub,  } from "../../Interfaces/ClubsIntefaces";
import {  GetClubInfoAPI } from "../../APIs/ClubsAPIs";
import { useAppSelector } from "../../Slices/Hooks";
import { Footer } from "../../Components/Footer";
import { JoinClubForm } from "../../Components/JoinClubForm";
import { NotificationCard } from "../../Components/NotificationCard";
import { About } from "../../Components/Club/About";
import { Members } from "../../Components/Club/Members";
import { ApplicationsRequests } from "../../Components/Club/ApplicationsRequests";
import { Menu, X } from "lucide-react";
import { Events } from "../../Components/Club/Events";
export function Club() {
  const { id } = useParams();
  const UserId = useAppSelector((s) => s.ClientInfoSlice.ClientInfo?.id)??-1;
  const clubId = Number(id);
  const [club, setClubInfo] = useState<IClub | null | false>(null);
  const [ShowNotificationCard, SetShowNotificationCard] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "about" | "members" | "events" | "applications"
  >("about");

  const [showJoinForm, setShowJoinForm] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // mobile burger state
  const [loadclubinfo, setloadclubinfo] = useState<boolean>(false);

  useEffect(() => {
    async function Get() {
      const res = await GetClubInfoAPI(UserId ?? -1, Number(id));
      if (res !== false) {
        setClubInfo(res);
      } else setClubInfo(false);
    }
   
      Get();
    
    setloadclubinfo(false);
  }, [loadclubinfo,UserId]);

 

  if (club === null) {
    return (
      <div className="w-full h-full flex items-center justify-center py-6">
        <div className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (club === false) {
    return <p className="text-center mt-10 text-gray-500">Club not found.</p>;
  }

  return (
      <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 px-4 md:px-10 xl:px-60 py-8 space-y-6">
        {/* 🧭 Header Section */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="relative h-64 sm:h-80 w-full">
            <img
              src={club.imageUrl}
              alt={club.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gray-700/60 flex flex-col justify-center items-center text-center text-white p-4">
              <h1 className="text-2xl sm:text-4xl font-bold">{club.name}</h1>
              <p className="text-sm sm:text-lg">{club.type}</p>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="border-t border-gray-200 px-4 py-3">
            {/* Mobile Menu */}
            <div className="sm:hidden flex justify-between items-center">
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 font-medium"
              >
                {showMenu ? <X size={20} /> : <Menu size={20} />}
                <span>
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </span>
              </button>
            </div>

            {/* Mobile Dropdown */}
            {showMenu && (
              <div className="sm:hidden flex flex-col bg-white shadow rounded-lg mt-2 border border-gray-100">
                {[
                  "about",
                  "events",
                  "members",
                  ...(club.studentRole === "Admin" ? ["applications"] : []),
                ].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab as any);
                      setShowMenu(false);
                    }}
                    className={`px-4 py-2 text-left text-sm font-medium ${
                      activeTab === tab
                        ? "text-teal-600 bg-teal-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            )}

            {/* Desktop Tabs */}
            <div className="hidden sm:flex justify-center gap-6 mt-3">
              {[
                "about",
                "events",
                "members",
                ...(club.studentRole === "Admin" ? ["applications"] : []),
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`pb-2 border-b-2 transition-colors text-sm sm:text-base font-medium ${
                    activeTab === tab
                      ? "border-teal-600 text-teal-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "about" && (
            <About
              club={club}
              UserId={UserId}
              setloadclubinfo={(set: boolean) => {
                setloadclubinfo(set);
              }}
            />
          )}

          {activeTab === "members" && (
            <Members
              UserId={UserId}
              ClubId={club.id}
              UserRole={club.studentRole}
            />
          )}

          {activeTab === "applications" && (
            <ApplicationsRequests ClubId={club.id} />
          )}

          {activeTab === "events" && (
           <Events UserId={UserId} ClubId={clubId} UserRole={club.studentRole}/>
          )}
        </div>
      </div>

      {/* Join Modal */}
      {showJoinForm && UserId && (
        <JoinClubForm
          OnSuccess={(closeForm: boolean, showNotif: boolean) => {
            setShowJoinForm(closeForm);
            SetShowNotificationCard(showNotif);
            club.joiningStatus = "Requested";
          }}
          ClubName={club.name}
          StudentId={UserId}
          ClubId={club.id}
        />
      )}

      <Footer />

      <NotificationCard
        message="Successfully sent joining request to the club!"
        isSuccess={true}
        show={ShowNotificationCard}
        onClose={() => SetShowNotificationCard(false)}
      />
    </div>
  );
}
