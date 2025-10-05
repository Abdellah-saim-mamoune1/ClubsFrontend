import { useNavigate } from "react-router-dom";
import { IEvent } from "../Interfaces/ClubsIntefaces";
import { FiCalendar, FiEye, FiMapPin } from "react-icons/fi";
import EventImage from "../public/Images/EventImage.jpg"
export function EventCard ({event}:{event:IEvent})  {
const navigate=useNavigate();
    return (
  <div
  className="bg-white rounded-xl shadow-sm hover:shadow-md transition hover:-translate-y-1 duration-200 flex flex-col cursor-pointer"
  onClick={() => navigate(`/event/${event.id}`)}
>
  <img
    src={EventImage}
    alt={event.title}
    className="w-full  h-40 object-cover rounded-t-xl"
  />
  <div className="py-3 px-4 flex flex-col flex-1">
   
    <h3 className="text-base font-semibold mb-1 line-clamp-2 text-gray-800">
      {event.title}
    </h3>

    <span
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/club/${event.clubId}`);
      }}
      className="text-teal-600 text-sm mb-3 cursor-pointer hover:underline"
    >
      {event.clubName}
    </span>

    <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
      <FiCalendar className="w-4 h-4" />
      {event.date} | {event.from} - {event.to}
    </p>
    <p className="text-xs text-gray-500 flex items-center gap-1">
      <FiMapPin className="w-4 h-4" />
      {event.address}
    </p>
     {event.isPrivate ? (
     <span className="inline-block mt-3 bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full mb-2 w-fit">
        Private
      </span>
    ):
     <span className="inline-block mt-3 bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full mb-2 w-fit">
        Public
      </span>
    }

    <div className="flex mt-auto items-center justify-between pt-6">
      <div className="flex items-center text-gray-500 text-sm">
        <FiEye className="mr-1" /> {event.views}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/event/${event.id}`);
        }}
        className="text-xs font-semibold text-teal-600 hover:underline"
      >
        Details
      </button>
    </div>
  </div>
</div>

  );
}
