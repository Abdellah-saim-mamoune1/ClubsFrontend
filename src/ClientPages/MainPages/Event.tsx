import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, FormEvent } from "react";
import { IEvent } from "../../Interfaces/ClubsIntefaces";
import EventImage from "../../public/Images/EventImage.jpg"
import { GetClubEventByIdAPI, JoiningClubEventAPI, ViewEventByIdAPI } from "../../APIs/ClubsAPIs";
import {
  FiEye,
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiSettings,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import { useAppSelector } from "../../Slices/Hooks";
import { Footer } from "../../Components/Footer";
import { X } from "lucide-react";
import { IEventUpdate } from "../../Interfaces/ClubAdminInterfaces";
import { ClubEventDeleteAPI, ClubEventUpdateAPI } from "../../APIs/ClubAdminAPIs";
import { NotificationCard } from "../../Components/NotificationCard";
export function Event() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<IEvent | null | false>(null);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newEvent, setNewEvent] = useState<IEventUpdate>({
    id: Number(id),
    title: "",
    address: "",
    content: "",
    date: "",
    from: "",
    to: "",
    isPrivate: false,
    maxRegistrationCount: 0,
  });
  const UserId = useAppSelector((s) => s.ClientInfoSlice.ClientInfo?.id) ?? -1;

  // Notification state
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    isSuccess: boolean;
  }>({ show: false, message: "", isSuccess: true });

  const showNotification = (message: string, isSuccess: boolean) => {
    setNotification({ show: true, message, isSuccess });
  };

  useEffect(() => {
    const fetchEvent = async () => {
      const data = await GetClubEventByIdAPI(UserId ?? -1, Number(id));
      if (!data) {
        setEvent(false);
        return;
      }
      setEvent(data);

      setNewEvent({
        id: Number(id),
        title: data.title,
        address: data.address,
        content: data.content,
        date: data.date,
        from: data.from,
        to: data.to,
        isPrivate: data.isPrivate,
        maxRegistrationCount: data.registrationInfo?.maxRegistrationsCount ?? 1,
      });

      ViewEventByIdAPI(Number(id));
     
    };
 
    fetchEvent();
  }, [id,UserId]);

  if (event === null) {
    return (
      <div className="w-full h-full flex items-center justify-center py-10">
        <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (event === false) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-gray-600">
        <div className="text-6xl mb-4">😕</div>
        <p className="text-lg mb-4">Event not found.</p>
        <button
          onClick={() => navigate("/events")}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded-xl shadow transition"
        >
          Back to Events
        </button>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const now = new Date();
  const isUpcoming = eventDate >= now;

 const handleRegister = async () => {
  setLoading(true);
  if(UserId===-1)
    navigate("/login");

  else{
  const res = await JoiningClubEventAPI(Number(id));

  if (res) {
    showNotification("Joined Event successfully!", true);

    setEvent((prev) =>
      prev
        ? {
            ...prev,
            isStudentJoined: true, 
            registrationInfo: prev.registrationInfo
              ? {
                  ...prev.registrationInfo,
                  currentRegistrationsCount:
                    (prev.registrationInfo.currentRegistrationsCount) + 1, 
                }
              : prev.registrationInfo,
          }
        : prev
    );
  } else {
    showNotification("Failed to join the event.", false);
  }

  setLoading(false);
}
};


  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this event?")) {
      const res = await ClubEventDeleteAPI(UserId, Number(id));
      if (res) {
        showNotification("Event deleted successfully!", true);
        navigate("/events");
      } else {
        showNotification("Failed to delete the event.", false);
      }
    }
  };

  const handleUpdate = () => setShowForm(true);

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setNewEvent((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setNewEvent((prev) => ({ ...prev, [name]: value }));
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await ClubEventUpdateAPI(UserId, newEvent);
    if (res) {
      showNotification("Event updated successfully!", true);
     setEvent((prev) =>
  prev
    ? {
        ...prev,
        ...newEvent,
        registrationInfo: prev.registrationInfo
          ? { ...prev.registrationInfo, maxRegistrationsCount: newEvent.maxRegistrationCount }
          : prev.registrationInfo,
      }
    : prev
);

    } else {
      showNotification("Failed to update the event.", false);
    }
    setSubmitting(false);
    setShowForm(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content */}
      <div className="flex-grow px-3 py-6">
        <div className="relative max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden animate-fadeIn">
          {/* Settings icon */}
          {event.isStudentAdmin && (
            <div className="absolute top-3 right-3">
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  <FiSettings className="text-gray-700 text-xl" />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <button
                      onClick={handleUpdate}
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    >
                      <FiEdit className="mr-2 text-blue-500" /> Update
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition"
                    >
                      <FiTrash2 className="mr-2" /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Header image */}
          <div className="h-52 w-full overflow-hidden">
            <img
              src={EventImage}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                onClick={() => navigate(`/club/${event.clubId}`)}
                className="text-blue-600 font-medium cursor-pointer underline hover:text-blue-700 transition"
              >
                {event.clubName}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  isUpcoming ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {isUpcoming ? "Upcoming" : "Passed"}
              </span>
            </div>

            <p className="text-gray-600 flex items-center mb-1">
              <FiMapPin className="mr-2" /> {event.address}
            </p>
            <p className="text-gray-600 flex items-center mb-4">
              <FiCalendar className="mr-2" /> {eventDate.toLocaleDateString()} | {event.from} - {event.to}
            </p>
              {event.isPrivate && (
     <span className="inline-block bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full w-fit">
        Private
      </span>
    )}
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                About the Event
              </h2>
              <p className="text-gray-700 leading-relaxed">{event.content}</p>
            </div>

            {event.registrationInfo && (
              <div className="flex rounded-xl mt-6 bg-gray-50 border border-gray-200 p-3 mb-1 items-center text-gray-700 font-medium">
                <FiUsers className="mr-3 text-cyan-600" />
                <span className="text-gray-900 font-semibold">
                  {event.registrationInfo.currentRegistrationsCount} / {event.registrationInfo.maxRegistrationsCount}
                </span>
              </div>
            )}

            <div className="mt-4 flex items-center text-gray-500 text-sm">
              <FiEye className="mr-1" /> {event.views}
            </div>

            <div className="mt-6">
              {event.isStudentJoined ? (
                <div className="w-full text-center bg-green-50 text-green-700 border border-green-300 font-semibold py-3 px-6 rounded-xl shadow-md animate-fadeIn">
                  You are registered for this event
                </div>
              ) : isUpcoming ? (
                <button
                  onClick={handleRegister}
                  disabled={loading}
                  className={`w-full ${loading ? "bg-cyan-400 cursor-wait" : "bg-cyan-600 hover:bg-cyan-700"} text-white font-semibold py-3 px-6 rounded-xl shadow-md transition`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Registering...
                    </span>
                  ) : "Register Now"}
                </button>
              ) : (
                <div className="w-full text-center bg-gray-100 text-gray-500 font-semibold py-3 px-6 rounded-xl shadow-md animate-fadeIn">
                  Registration Closed
                </div>
              )}
            </div>
          </div>
       
        </div>
          {/*Registered Students*/}
          <div className="flex-grow w-full  mt-6">
              <div className="relative max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden animate-fadeIn">
                 <div className="p-6">
            <h1 className="text-2xl  font-bold text-gray-900 mb-2">
              registered Students
            </h1>
           This feature is not implemented yet
            </div>
              </div>
          </div>
      </div>
      
      <Footer />

      {/* Update Event Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-2 sm:px-0">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold mb-4">Update Event</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Event Name */}
              <div>
                <label className="block text-sm font-medium">Event Name</label>
                <input
                  type="text"
                  name="title"
                  maxLength={50}
                  minLength={5}
                  value={newEvent.title}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              {/* Address */}
              <div>
                <label className="block text-sm font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  maxLength={50}
                  minLength={5}
                  value={newEvent.address}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              {/* Description */}
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="content"
                  value={newEvent.content}
                  maxLength={400}
                  minLength={5}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border rounded-lg px-3 py-3 mt-1 focus:ring-2 focus:ring-teal-500 resize-none"
                  placeholder="Write event details..."
                />
              </div>
              {/* Date & Time */}
           
                <div>
                  <label className="block text-sm font-medium">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={newEvent.date}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium">From</label>
                    <input
                      type="time"
                      name="from"
                      value={newEvent.from}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium">To</label>
                    <input
                      type="time"
                      name="to"
                      value={newEvent.to}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                </div>
           

              {/* Private Event */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isPrivate"
                  checked={newEvent.isPrivate}
                  onChange={handleInputChange}
                  className="rounded border-gray-300"
                />
                <label className="text-sm text-gray-700">Private Event</label>
              </div>

              {/* Max Registration Number */}
              <div>
                <label className="block text-sm font-medium">Max Registration Number</label>
                <input
                  type="number"
                  min={event.registrationInfo.currentRegistrationsCount}
                  max={100000}
                  name="maxRegistrationCount"
                  value={newEvent.maxRegistrationCount}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-2"
                >
                  {submitting && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notification */}
      <NotificationCard
        message={notification.message}
        isSuccess={notification.isSuccess}
        show={notification.show}
        onClose={() => setNotification(prev => ({ ...prev, show: false }))}
      />
    </div>
  );
}
