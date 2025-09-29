import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../Slices/Hooks.ts";
import { useNavigate } from "react-router-dom";
import {
  GetLatestEventsAPI,
  GetMostActiveClubsAPI,
  GetNewClubsAPI,
} from "../../APIs/ClubsAPIs.ts";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const NewClubs = useAppSelector((s) => s.ClubsInfoSlice.NewClubs);
  const MostActiveClubs = useAppSelector((s) => s.ClubsInfoSlice.MostActiveClubs);
  const LatestEvents = useAppSelector((s) => s.ClubsInfoSlice.LatestEvents);

  const newRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(GetNewClubsAPI());
    dispatch(GetMostActiveClubsAPI());
    dispatch(GetLatestEventsAPI());
    // If you have an API for LatestEvents, call it here as well
  }, [dispatch]);

  if (!NewClubs || !MostActiveClubs || !LatestEvents) return null;

  const scroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    dir: "left" | "right"
  ) => {
    if (ref.current) {
      const amount = dir === "left" ? -250 : 250;
      ref.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const ClubCard = (Club: any) => (
    <div
      key={Club.id}
      className="flex-shrink-0 scroll-snap-start w-full sm:w-[230px] lg:w-full bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col"
    >
      <img
        src={
        
          "https://tse2.mm.bing.net/th/id/OIP.qvhcmd-GbCm7CDbfUmF9LAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
        }
        onClick={() => navigate(`/club/${Club.id}`)}
        alt={Club.name}
        className="w-full h-[200px] sm:h-[140px] md:h-[130px] object-cover rounded-t cursor-pointer"
      />
      <div className="p-2 flex flex-col gap-2 flex-grow">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold line-clamp-2">{Club.name}</h3>
          <div className="bg-teal-600 text-white text-sm font-bold px-3 py-0.5 rounded-lg">
            {Club.eventsNumber} Event
          </div>
        </div>
        <h4 className="text-xs text-gray-500 mb-2">{Club.type}</h4>
      </div>
    </div>
  );

const EventCard = (event: any) => (
  <div
    key={event.id}
    className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col"
  >
    {/* Image */}
    <img
      src={
        "https://th.bing.com/th/id/OIP.BaPWuGE4cKNAny3EfIRRhwHaE8?w=255&h=180&c=7&r=0&o=7&pid=1.7&rm=3"
      }
      alt={event.title}
      className="w-full h-40 object-cover rounded-t"
    />

    {/* Content */}
    <div className="py-2 px-3 flex flex-col">
      {/* Title */}
      <h3 className="text-base mb-5 font-semibold line-clamp-2">
        {event.title}
      </h3>

      {/* Date + Time */}
       <p className="text-xs text-gray-800 mb-2">
        {event.clubName}
      </p>
      <p className="text-xs text-gray-500">
        {event.date} | {event.from} - {event.to}
      </p>

      {/* Address */}
      <p className="text-xs text-gray-500">{event.address}</p>

      {/* Views + Details */}
      <div className="flex mb-2 items-center justify-between mt-5">
        <p className="text-xs text-gray-700">{event.views} views</p>
        <button className="text-xs font-semibold text-teal-600 hover:underline">
          Details
        </button>
      </div>
    </div>
  </div>
);


return (
  <div className="w-full">
    {/* Hero Section */}
    <section className="relative mb-3 w-full h-[340px] sm:h-[300px] lg:h-[400px]">
      {/* Background Image */}
      <img
        src="https://www.ysuites.co/wp-content/uploads/2022/09/tips-to-prepare-for-your-graduation-1.jpg"
        alt="Clubs Hero"
        className="w-full h-full object-cover"
      />
      {/* Overlay Blur */}
      <div className="absolute inset-0 bg-cyan-700/60  flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Discover & Join Amazing Clubs
        </h1>
        <p className="text-sm sm:text-lg text-gray-200 max-w-2xl mb-6">
          Connect with students, explore your passions, and be part of events
          that inspire innovation and collaboration.
        </p>
        <button className="bg-white text-cyan-700 font-semibold px-6 py-2 rounded-xl shadow hover:bg-gray-100 transition">
          Sign In
        </button>
      </div>
    </section>

    {/* Main Content */}
    <div className="py-3 px-3 sm:px-5 space-y-6">
      {/* New Clubs */}
      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">New Clubs</h2>
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
            {NewClubs.map((Club) => ClubCard(Club))}
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
      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
          {LatestEvents.map((event) => EventCard(event))}
        </div>
      </section>

      {/* Most Active Clubs */}
      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
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
            {MostActiveClubs.map((Club) => ClubCard(Club))}
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

    {/* Footer */}
    <footer className="bg-gray-800 text-gray-200 mt-4 py-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
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
              <a href="/clubs" className="hover:underline">
                All Clubs
              </a>
            </li>
            <li>
              <a href="/events" className="hover:underline">
                Upcoming Events
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 mt-6">
        © {new Date().getFullYear()} University Clubs. All rights reserved.
      </div>
    </footer>
  </div>
);
}