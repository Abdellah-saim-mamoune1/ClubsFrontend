import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMember } from "../../Interfaces/ClubsIntefaces";
import { GetClubMembersAPI } from "../../APIs/ClubsAPIs";
import { RemoveMemberAPI, SetMemberAsAdminAPI } from "../../APIs/ClubAdminAPIs";
import { NotificationCard } from "../NotificationCard";

export function Members({
  UserId,
  UserRole,
  ClubId,
}: {
  UserId: any;
  ClubId: number;
  UserRole: string;
}) {
  const navigate = useNavigate();
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [members, setMembers] = useState<IMember[] | null>(null);

  // notification state
  const [notification, setNotification] = useState<{
    message: string;
    isSuccess: boolean;
    show: boolean;
  }>({ message: "", isSuccess: true, show: false });

  async function fetchMembers() {
    setLoadingMembers(true);
    const result = await GetClubMembersAPI(ClubId);
    if (result !== false) setMembers(result);
    setLoadingMembers(false);
  }

  useEffect(() => {
    fetchMembers();
  }, []);

  function showNotification(message: string, isSuccess: boolean) {
    setNotification({ message, isSuccess, show: true });
  }

  async function handleKickOut(memberId: number) {
    const confirmed = window.confirm("Are you sure you want to remove this member?");
    if (!confirmed) return;

    const success = await RemoveMemberAPI(memberId, ClubId);
    if (success) {
      setMembers((prev) => prev?.filter((m) => m.id !== memberId) || null);
      showNotification("Member removed successfully.", true);
    } else {
      showNotification("Failed to remove member.", false);
    }
  }

  async function handleSetAdmin(memberId: number) {
    const confirmed = window.confirm("Are you sure you want to set this member as admin?");
    if (!confirmed) return;

    const success = await SetMemberAsAdminAPI(memberId, ClubId);
    if (success) {
      await fetchMembers();
      showNotification("Member promoted to admin successfully.", true);
    } else {
      showNotification("Failed to set member as admin.", false);
    }
  }

  return (
    <div className="relative">
      <div className="bg-white px-4 sm:px-6 py-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Members</h2>

        {loadingMembers ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : members && members.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {members.map((m) => (
              <li
                key={m.id}
                className="flex items-center justify-between gap-3 py-3 hover:bg-gray-50 rounded-lg px-2 transition"
              >
                {/* Profile Info */}
                <div
                  onClick={() => {
                    if (m.id === UserId) navigate("/account");
                    else navigate(`/students/${m.id}`);
                  }}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <img
                    src={m.imageUrl || "https://via.placeholder.com/40"}
                    alt={m.fullName}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <div>
                    <span className="font-medium text-gray-700">{m.fullName}</span>
                    <p className="text-xs text-gray-500">
                      Role: {m.isAdmin?"Admin":"Member"} • Joined:{" "}
                      {m.joinedAt}
                    </p>
                  </div>
                </div>

                {/* Admin Actions */}
                {UserRole === "Admin" && m.id !== UserId && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSetAdmin(m.id)}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                    >
                      Set as Admin
                    </button>
                    <button
                      onClick={() => handleKickOut(m.id)}
                      className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p className="text-sm">No members found.</p>
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
