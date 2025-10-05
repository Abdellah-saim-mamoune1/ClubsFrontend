import { Settings, X } from "lucide-react";
import { EventCard } from "../EventCard";
import { useEffect, useState } from "react";
import { GetClubEventsAPI } from "../../APIs/ClubsAPIs";
import { IEvent } from "../../Interfaces/ClubsIntefaces";
import { IEventSet } from "../../Interfaces/ClubAdminInterfaces";
import { ClubEventAddAPI } from "../../APIs/ClubAdminAPIs";
import { NotificationCard } from "../NotificationCard";

export function Events({
  UserId,
  UserRole,
  ClubId,
}: {
  UserId: any;
  UserRole: string;
  ClubId: number;
}) {
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [events, setEvents] = useState<IEvent[] | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const[refetch,setrefetch]=useState(false);
  const [newEvent, setNewEvent] = useState<IEventSet>({
    title: "",
    address: "",
    content: "",
    date: "",
    from: "",
    to: "",
    clubId: ClubId,
    isPrivate: false,
    maxRegistrationsCount: 10,
  });

  // notification state
  const [notification, setNotification] = useState<{
    message: string;
    isSuccess: boolean;
    show: boolean;
  }>({ message: "", isSuccess: true, show: false });

  function showNotification(message: string, isSuccess: boolean) {
    setNotification({ message, isSuccess, show: true });
  }

  useEffect(() => {
    async function fetchEvents() {
      setLoadingEvents(true);
      const result = await GetClubEventsAPI(UserId ?? -1, ClubId);
      if (result !== false) setEvents(result);
      setLoadingEvents(false);
    }
    fetchEvents();
  }, [UserId, ClubId,refetch]);

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setNewEvent((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      setNewEvent((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const res = await ClubEventAddAPI(UserId, newEvent);
    setSubmitting(false);

    if (res !== false) {
      showNotification("Event created successfully!", true);
      setShowForm(false);
      setrefetch(true);
     // setEvents((prev) => (prev ? [...prev, res] : [res]));
    } else {
      showNotification("Failed to create event.", false);
    }
  }






  
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const nextYear = new Date(today);
nextYear.setFullYear(today.getFullYear() + 1);

const formatDate = (date: Date) => date.toISOString().split("T")[0];

const minDate = formatDate(tomorrow);
const maxDate = formatDate(nextYear);


  return (
    <div className="bg-white px-3 sm:px-6 py-5 rounded-xl shadow relative">
      <div className="flex items-center mb-4 justify-between">
        <h2 className="text-xl font-semibold">Events</h2>
        {UserRole === "Admin" && (
          <button
            onClick={() => setShowForm(true)}
            className="text-sm text-gray-800 hover:text-gray-900 font-semibold flex items-center gap-1"
          >
            <Settings className="w-5 h-5" />
            Settings
          </button>
        )}
      </div>

      {loadingEvents ? (
        <div className="flex justify-center py-6">
          <div className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : events && events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No events found.</p>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-2 sm:px-0">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold mb-4">Create / Edit Event</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Event Name</label>
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  value={newEvent.address}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="content"
                  value={newEvent.content}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-teal-500 resize-none"
                  placeholder="Write event details..."
                />
              </div>

           
                <div>
                  <label className="block text-sm font-medium">Date</label>
                  <input
                    type="date"
                    name="date"
                    min={minDate}
                    max={maxDate}
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

              <div>
                <label className="block text-sm font-medium">
                  Max Registration Number
                </label>
                <input
                  type="number"
                  name="maxRegistrationsCount"
                  value={newEvent.maxRegistrationsCount}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Event Image</label>
                <input
                  type="file"
                  name="eventImage"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const reader = new FileReader();
                      reader.onload = () =>
                        setNewEvent((prev) => ({
                          ...prev,
                          eventImage: reader.result as string,
                        }));
                      reader.readAsDataURL(e.target.files[0]);
                    }
                  }}
                  className="mt-1"
                />
              {/*}  {newEvent.eventImage && (
                  <img
                    src={newEvent.eventImage}
                    alt="Event Preview"
                    className="mt-2 w-full h-40 object-cover rounded-lg border"
                  />
                )}*/}
              </div>

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
        onClose={() => setNotification({ ...notification, show: false })}
      />
    </div>
  );
}
