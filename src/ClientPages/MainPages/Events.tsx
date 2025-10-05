import { useEffect, useState, useRef } from "react";
import { SearchEventsByNameAPI } from "../../APIs/ClubsAPIs";
import { IEvent } from "../../Interfaces/ClubsIntefaces";
import { FiSearch } from "react-icons/fi";
import { EventCard } from "../../Components/EventCard";
import { Footer } from "../../Components/Footer";

export function Events() {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize] = useState<number>(6);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [totalEvents, setTotalEvents] = useState<number>(0);

  const [searchInput, setSearchInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await SearchEventsByNameAPI(search, pageNumber, pageSize);
        if (res) {
          setEvents((prev) =>
            pageNumber === 1 ? res.events ?? [] : [...prev, ...(res.events ?? [])]
          );
          const total = res.totalPages ?? 0;
          setTotalEvents(total);
          setHasMore(pageNumber * pageSize < total);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [pageNumber, pageSize, search]);

  // Reset when search changes
  useEffect(() => {
    setPageNumber(1);
    setEvents([]);
    setHasMore(true);
  }, [search]);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPageNumber((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);
    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasMore, loading]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 w-full px-4 md:px-10 xl:px-60 py-8 space-y-6">
        {/* 🧭 Top section (title + search) */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Events <span className="text-gray-500 text-base">({totalEvents})</span>
          </h2>

          <div className="relative flex gap-2 w-full sm:w-auto">
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearch(searchInput);
                  setPageNumber(1);
                  setEvents([]);
                  setHasMore(true);
                }
              }}
              className="pl-10 pr-4 py-2 border rounded-lg shadow-sm w-full sm:w-72 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        </div>

        {/* 📦 Bottom section (content) */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[200px]">
            {!loading && events.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-10 text-gray-500">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4076/4076500.png"
                  alt="No events"
                  className="w-20 h-20 mb-3 object-cove"
                />
                <p className="text-base font-medium">No results found.</p>
              </div>
            ) : (
              events.map((event) => <EventCard key={event.id} event={event} />)
            )}
          </div>

          {/* Infinite scroll trigger */}
          <div ref={loaderRef} className="flex justify-center py-8">
            {loading && (
              <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
