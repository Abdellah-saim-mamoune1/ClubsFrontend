import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GetApplicationsRequestsAPI,
  AcceptApplicationAPI,
  RefuseApplicationAPI,
} from "../../APIs/ClubAdminAPIs";
import { NotificationCard } from "../NotificationCard";
import { IClubApplicationRequest } from "../../Interfaces/ClubAdminInterfaces";

export function ApplicationsRequests({ ClubId }: { ClubId: number }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState<IClubApplicationRequest[] | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null); // track expanded motivation
  const PageNumber = 1;
  const PageSize = 10;

  const [notification, setNotification] = useState<{
    message: string;
    isSuccess: boolean;
    show: boolean;
  }>({ message: "", isSuccess: true, show: false });

  async function fetchApplications() {
    setLoading(true);
    const result = await GetApplicationsRequestsAPI(ClubId, PageNumber, PageSize);
    if (result !== false) {
      setApplications(result.applications);
      setTotalCount(result.totalCount);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function showNotification(message: string, isSuccess: boolean) {
    setNotification({ message, isSuccess, show: true });
  }

  async function handleAccept(applicationId: number,userd:number) {
    const success = await AcceptApplicationAPI(applicationId,userd,ClubId);
    if (success) {
      setApplications((prev) => prev?.filter((a) => a.applicationId !== applicationId) || null);
      showNotification("Application accepted successfully.", true);
    } else {
      showNotification("Failed to accept application.", false);
    }
  }

  async function handleRefuse(applicationId: number) {
    const success = await RefuseApplicationAPI(applicationId);
    if (success) {
      setApplications((prev) => prev?.filter((a) => a.applicationId !== applicationId) || null);
      showNotification("Application refused.", true);
    } else {
      showNotification("Failed to refuse application.", false);
    }
  }

  return (
    <div className="relative">
      <div className="bg-white px-4 sm:px-6 py-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Applications
        </h2>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : applications && applications.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {applications.map((app,_) => {
              const isExpanded = expanded === app.applicationId;
              const maxPreview = 180;
              const motivationPreview =
                app.studentMotivation.length > maxPreview && !isExpanded
                  ? app.studentMotivation.slice(0, maxPreview) + "..."
                  : app.studentMotivation;

              return (
                <li
                  key={_}
                  className="flex flex-col sm:flex-row justify-between gap-4 py-4 hover:bg-gray-50 rounded-lg px-3 transition"
                >
                  {/* Left: profile + text. IMPORTANT: make this shrinkable w-0 flex-1 min-w-0 */}
                  <div
                    className="flex items-start gap-3 w-full sm:w-0 sm:flex-1 min-w-0 cursor-pointer"
                    onClick={() => navigate(`/students/${app.studentId}`)}
                  >
                    <img
                      src={app.studentImageUrl || "https://via.placeholder.com/40"}
                      alt={app.studentName}
                      className="w-10 h-10 rounded-full object-cover border flex-shrink-0"
                    />

                    {/* Inner text container must allow shrinking: min-w-0 */}
                    <div className="min-w-0">
                      <p className="font-medium text-gray-800">{app.studentName}</p>
                      <p className="text-sm text-gray-500">{app.studentEmail}</p>
                      <p className="text-xs text-gray-400">
                        Applied: {new Date(app.date).toLocaleDateString()}
                      </p>

                      {/* Motivation - robust wrapping: break words + overflowWrap: anywhere */}
                      <div
                        className="mt-2 text-sm break-word text-gray-600 whitespace-pre-line"
                       
                      >
                        <span className="font-medium">Motivation:</span>{" "}
                        <span className="break-words">{motivationPreview}</span>
                      </div>

                      {/* show more/less */}
                      {app.studentMotivation.length > maxPreview && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpanded(isExpanded ? null : app.applicationId);
                          }}
                          className="text-xs text-teal-600 mt-1 hover:underline"
                        >
                          {isExpanded ? "Show less" : "Show more"}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right: actions - do not allow this column to shrink the left column */}
                  <div className="flex-shrink-0 flex gap-2 self-center sm:self-start">
                    <button
                      onClick={() => handleAccept(app.applicationId,app.studentId)}
                      className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRefuse(app.applicationId)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      Refuse
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p className="text-sm">No applications found.</p>
          </div>
        )}
      </div>

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
