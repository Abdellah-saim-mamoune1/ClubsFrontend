import { useState } from "react";
import { IClubJoiningRequest } from "../../Interfaces/ClubsIntefaces";
import { JoiningClubRequestAPI } from "../../APIs/ClubsAPIs";

export function JoinClubForm({
  clubId,
  userId,
  onClose,
  setShowJoinForm,
  setNotif,
  setloadclubinfo

}: {
  clubId: number;
  userId: number;
  setShowJoinForm:(set:boolean)=>void,
  onClose: () => void;
  setloadclubinfo:(set:boolean)=>void, 
  setNotif:(notif:{show:boolean,
  message:string,
  isSuccess:boolean})=>void
}) {


  const [form, setForm] = useState<IClubJoiningRequest>({
    Email: "",
    Motivation: "",
    StudentId:userId,
    ClubId:clubId
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.Email.trim() || !form.Motivation.trim()) return;
   
      setLoading(true);
      await JoiningClubRequestAPI(form);
      setNotif({
        show: true,
        message: "Join request sent successfully",
        isSuccess: true,
      });
      setShowJoinForm(false);
      setloadclubinfo(true);
      setLoading(false);
    } 
     

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
        <h3 className="text-xl font-semibold mb-4 text-center">Join Club</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="Email"
              value={form.Email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Motivation
            </label>
            <textarea
              name="Motivation"
              value={form.Motivation}
              onChange={handleChange}
              rows={4}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-5 py-2 rounded-lg font-semibold text-white transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-600 hover:bg-teal-700"
              }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
