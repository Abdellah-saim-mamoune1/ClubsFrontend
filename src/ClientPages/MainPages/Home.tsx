import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../Slices/Hooks.ts";
import { useNavigate } from "react-router-dom";
import { GetMostActiveClubsAPI, GetNewClubsAPI } from "../../APIs/ClubsAPIs.ts";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const NewClubs = useAppSelector((s) => s.ClubsInfoSlice.NewClubs);
  const MostActiveClubs = useAppSelector((s) => s.ClubsInfoSlice.MostActiveClubs);

  const newRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(GetNewClubsAPI());
    dispatch(GetMostActiveClubsAPI());
  }, [dispatch]);

  if (!NewClubs || !MostActiveClubs) return null;

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
        onClick={() => navigate("/Detail")}
        alt={Club.name}
        className="w-full h-[200px] sm:h-[140px] md:h-[130px] object-cover rounded-t cursor-pointer"
      />
      <div className="p-2 flex flex-col gap-2 flex-grow">
        {/* Title + Events */}
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

  return (
    <div className="w-full space-y-8">
      {/* New Clubs */}
      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">New Clubs</h2>
        <div className="relative">
          {/* Arrows visible only on < lg */}
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

      {/* Most Active Clubs */}
      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          Most Active Clubs
        </h2>
        <div className="relative">
          {/* Arrows visible only on < lg */}
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
  );
}
