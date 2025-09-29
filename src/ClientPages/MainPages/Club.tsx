import { useParams } from "react-router-dom";

import { useState } from "react";
import { useAppSelector } from "../../Slices/Hooks";

export function Club()  {
  const { id } = useParams();
  const clubId = Number(id);
  const [activeTab, setActiveTab] = useState<"about" | "members" | "events">(
    "about"
  );

  const NewClubs = useAppSelector((s) => s.ClubsInfoSlice.NewClubs);
  const MostActiveClubs = useAppSelector((s) => s.ClubsInfoSlice.MostActiveClubs);

  // find the club
  let club =
    (NewClubs && NewClubs.find((c) => c.id === clubId)) ||
    (MostActiveClubs && MostActiveClubs.find((c) => c.id === clubId));

  if (!club) {
    return <p className="text-center mt-10 text-gray-500">Club not found.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-2 py-4">
      {/* Header image */}
      <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden shadow">
        <img
          src={club.imageUrl}
          alt={club.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white p-4">
          <h1 className="text-2xl sm:text-4xl font-bold">{club.name}</h1>
          <p className="text-sm sm:text-lg">{club.type}</p>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="flex justify-center mt-6 border-b border-gray-200">
        {["about", "members", "events"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-3 sm:px-6 py-2 text-sm sm:text-base font-medium ${
              activeTab === tab
                ? "text-teal-600 border-b-2 border-teal-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "about" && (
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h2 className="text-lg font-semibold">About the Club</h2>
            <p className="text-gray-700">{club.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center mt-6">
              <div>
                <p className="text-lg font-bold text-teal-600">
                  {club.eventsNumber}
                </p>
                <p className="text-sm text-gray-500">Events</p>
              </div>
              <div>
                <p className="text-lg font-bold text-teal-600">
                  {club.membersNumber}
                </p>
                <p className="text-sm text-gray-500">Members</p>
              </div>
              <div>
                <p className="text-lg font-bold text-teal-600">{club.id}</p>
                <p className="text-sm text-gray-500">Club ID</p>
              </div>
              <div>
                <p className="text-lg font-bold text-teal-600">Active</p>
                <p className="text-sm text-gray-500">Status</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "members" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-2">Members</h2>
            <p className="text-gray-500 text-sm">
              Members list will be displayed here...
            </p>
          </div>
        )}

        {activeTab === "events" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-2">Club Events</h2>
            <p className="text-gray-500 text-sm">
              Events list will be displayed here...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};


