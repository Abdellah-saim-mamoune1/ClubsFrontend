import { useState } from "react";
import { JoiningClubRequestAPI } from "../APIs/ClubsAPIs";
import { IClubJoiningRequest } from "../Interfaces/ClubsIntefaces";

export function JoinClubForm({
  ClubName,
  ClubId,
  StudentId,
 OnSuccess,
}: {
  ClubName: string;
  OnSuccess: (set: boolean, set2: boolean) => void;
  ClubId: number;
  StudentId: number;
}) {
  const [email, setEmail] = useState("");
  const [motivation, setMotivation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload
    setLoading(true);
    try {
      const form: IClubJoiningRequest = {
        StudentId: StudentId,
        ClubId: ClubId,
        Email: email,
        Motivation: motivation,
      };

      console.log(form);
      await JoiningClubRequestAPI(form);

      OnSuccess(false, true);
      setEmail("");
      setMotivation("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
      <form
        onSubmit={handleJoinSubmit}
        className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Join {ClubName}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              required
              type="email"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Motivation
            </label>
            <textarea
              required
              rows={4}
              maxLength={100}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              placeholder="Why do you want to join?"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => OnSuccess(false, false)}
            disabled={loading}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
