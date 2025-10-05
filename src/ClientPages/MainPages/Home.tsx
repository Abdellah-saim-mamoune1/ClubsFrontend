import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../Slices/Hooks.ts";
import { useNavigate } from "react-router-dom";
import {
  GetLatestEventsAPI,
  GetMostActiveClubsAPI,
  GetNewClubsAPI,
} from "../../APIs/ClubsAPIs.ts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EventCard } from "../../Components/EventCard.tsx";
import { Footer } from "../../Components/Footer.tsx";
import MainHomeImage from "../../public/Images/MainHomeImage.jpg"

export function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const NewClubs = useAppSelector((s) => s.ClubsInfoSlice.NewClubs);
  const MostActiveClubs = useAppSelector((s) => s.ClubsInfoSlice.MostActiveClubs);
  const LatestEvents = useAppSelector((s) => s.ClubsInfoSlice.LatestEvents);
  const IsLoggedIn=useAppSelector((s) => s.ClientInfoSlice.IsLoogedIn);
  const username=useAppSelector((s) => s.ClientInfoSlice.ClientInfo?.fullName);
  const newRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(GetNewClubsAPI());
    dispatch(GetMostActiveClubsAPI());
    dispatch(GetLatestEventsAPI());
    // If you have an API for LatestEvents, call it here as well
  }, [dispatch]);

  
  const scroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    dir: "left" | "right"
  ) => {
    if (ref.current) {
      const amount = dir === "left" ? -250 : 250;
      ref.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };
if (!NewClubs && !MostActiveClubs && !LatestEvents)
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

const ClubCard = ({Club }: { Club: any }) => (
  <div
    
    className="flex-shrink-0 scroll-snap-start w-full sm:w-[230px] lg:w-full bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col"
  >
    <img
      src={Club.imageUrl}
      onClick={() => navigate(`/club/${Club.id}`)}
      alt={Club.name}
      className="w-full h-[200px] sm:h-[140px] md:h-[130px] object-cover rounded-t cursor-pointer"
    />
    <div className="p-3 flex flex-col gap-2 flex-grow">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold line-clamp-2 text-gray-800">
          {Club.name}
        </h3>
        <div className="bg-teal-600 text-white text-xs font-bold px-3 py-0.5 rounded-lg">
          {Club.eventsNumber} Event
        </div>
      </div>
      <h4 className="text-xs text-gray-500">{Club.type}</h4>
    </div>
  </div>
);

return (
  <div className="w-full min-h-screen flex flex-col items-center bg-gray-100 text-gray-900">
    {/* Hero Section */}
    {!IsLoggedIn ? (
      <section className="relative mb-3 w-full h-[340px] sm:h-[300px] lg:h-[400px]">
        <img
          src={MainHomeImage}
          alt="Clubs Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-600/30 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Discover & Join Amazing Clubs
          </h1>
          <p className="text-sm sm:text-lg text-gray-200 max-w-2xl mb-6">
            Connect with students, explore your passions, and be part of events
            that inspire innovation and collaboration.
          </p>
          <button
            onClick={() => navigate("login")}
            className="ml-4 px-4 py-2 bg-white text-blue-800 rounded-lg cursor-pointer font-medium hover:bg-blue-100 transition"
          >
            Sign In
          </button>
        </div>
      </section>
    ) : (
      <div className="w-full bg-blue-800 text-white text-center px-2 py-6 mb-4 rounded-b-xl shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Welcome back, {username?.split(" ")[0]}
        </h1>
        <p className="text-sm sm:text-base text-blue-100 mt-2">
          Let’s explore what’s new today!
        </p>
      </div>
    )}

    <div className="w-full md:px-10">
      <div className="py-3 px-3 sm:px-5 space-y-6">
        {/* New Clubs */}
        <section className="bg-white rounded-xl shadow p-4">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
            New Clubs
          </h2>
          <div className="relative">
            <button
              onClick={() => scroll(newRef, "left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-1 hover:bg-gray-100 z-10 lg:hidden"
            >
              <ChevronLeft size={20} />
            </button>
            <div
              ref={newRef}
              className="flex gap-4 overflow-x-auto scroll-snap-x pb-2 scroll-smooth lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible"
            >
              {NewClubs && NewClubs.map((Club) => < ClubCard key={Club.id} Club={Club}/>)}
            </div>
            <button
              onClick={() => scroll(newRef, "right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-1 hover:bg-gray-100 z-10 lg:hidden"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </section>

        {/* Latest Events */}
        <section className="bg-white rounded-xl shadow p-4">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
            Upcoming Events
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
            {LatestEvents &&
              LatestEvents.map((event) => <EventCard key={event.id} event={event} />)}
          </div>
        </section>

        {/* Most Active Clubs */}
        <section className="bg-white rounded-xl shadow p-4">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
            Most Active Clubs
          </h2>
          <div className="relative">
            <button
              onClick={() => scroll(activeRef, "left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-1 hover:bg-gray-100 z-10 lg:hidden"
            >
              <ChevronLeft size={20} />
            </button>
            <div
              ref={activeRef}
              className="flex gap-4 overflow-x-auto scroll-snap-x pb-2 scroll-smooth lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible"
            >
              {MostActiveClubs &&
                MostActiveClubs.map((Club) => < ClubCard key={Club.id} Club={Club}/>)}
            </div>
            <button
              onClick={() => scroll(activeRef, "right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-1 hover:bg-gray-100 z-10 lg:hidden"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </section>
      </div>
    </div>

    <Footer />
  </div>
);

}