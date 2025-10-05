import { useEffect, useState } from "react";
import { supabase } from "../SupaBaseCLient";
import { IClubUpdate } from "../../Interfaces/ClubAdminInterfaces";
import { ClubUpdateAPI } from "../../APIs/ClubAdminAPIs";
import { IClub, IClubType } from "../../Interfaces/ClubsIntefaces";
import { GetClubsTypesAPI } from "../../APIs/ClubsAPIs";
import { useAppDispatch, useAppSelector } from "../../Slices/Hooks";


 async function deleteOldImage(imageUrl: string, bucketName = "EventsProjectImages") {
       try {
         if (!imageUrl) return;
     
         // Extract the path relative to bucket
         const urlParts = imageUrl.split("/");
         const bucketIndex = urlParts.indexOf(bucketName);
         if (bucketIndex === -1) return;
     
         const path = urlParts.slice(bucketIndex + 1).join("/");
     
         const { error } = await supabase.storage.from(bucketName).remove([path]);
         if (error) console.error("Error deleting old image:", error.message);
         else console.log("✅ Old image deleted successfully:", path);
       } catch (err) {
         console.error("Error deleting old image:", err);
       }
     }

export function UpdateClubForm(
    {club,
    setloadclubinfo,
    setShowUpdateForm,
    setNotif,
    UserId
     }
    :
    {club:IClub,
    UserId:number,
    setloadclubinfo:(set:boolean)=>void,
    setShowUpdateForm:(set:boolean)=>void,
    setNotif:(notif:{show:boolean,
    message:string,
    isSuccess:boolean})=>void
    }){

    const dispatch=useAppDispatch();
   
    
       useEffect(() => {
           dispatch(GetClubsTypesAPI());
         }, [dispatch]);
 
       const [loading, setLoading] = useState(false);
       const clubTypes = useAppSelector((s) => s.ClubsInfoSlice.ClubsTypes);
       const [updatedClub, setUpdatedClub] = useState<IClubUpdate>({
         name: club.name,
         clubId: club.id,
         description: club.description,
         openForRegistrations: club.openForRegistrations,
         typeId: club.typeId,
         imageUrl: club.imageUrl || "",
       });
     
       const [imageFile, setImageFile] = useState<File | null>(null);
       const [preview, setPreview] = useState<string>(club.imageUrl || "");
     
      
     
     
       // ✅ Handle image preview and selection
       const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         const file = e.target.files?.[0];
         if (file) {
           setImageFile(file);
           setPreview(URL.createObjectURL(file));
         }
       };
     
       // ✅ Upload image to Supabase
       const uploadImageToSupabase = async (file: File) => {
         const fileExt = file.name.split(".").pop();
         const fileName = `club_${updatedClub.clubId}_${Date.now()}.${fileExt}`;
     
         const { error } = await supabase.storage
           .from("EventsProjectImages") // bucket name
           .upload(fileName, file, { cacheControl: "3600", upsert: true });
     
         if (error) throw error;
     
         const {
           data: { publicUrl },
         } = supabase.storage.from("EventsProjectImages").getPublicUrl(fileName);
     
         return publicUrl;
       };
     
      // ✅ Handle form submission
      const handleUpdate = async () => {
        setLoading(true);
        try {
          let imageUrl = updatedClub.imageUrl;
    
          if (imageFile) {
            imageUrl = await uploadImageToSupabase(imageFile);
           
          }
          deleteOldImage(club.imageUrl,)
            await ClubUpdateAPI(UserId, { ...updatedClub, imageUrl });

            setNotif({
              show: true,
              message: "Club updated successfully",
              isSuccess: true,
            });
            setShowUpdateForm(false);
            setloadclubinfo(true);
          
        } catch (err) {
          console.error("Error:", err);
          setNotif({
            show: true,
            message: "Error while updating club",
            isSuccess: false,
          });
        } finally {
          setLoading(false);
        }
      };
    


    return(
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative max-h-[90vh] overflow-auto">
              <h3 className="text-lg font-semibold mb-4 text-center sm:text-left">Update Club Info</h3>
        
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                   handleUpdate();
                }}
                className="space-y-4"
              >
                {/* === Name === */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Club Name</label>
                  <input
                    type="text"
                    minLength={4}
                    maxLength={30}
                    value={updatedClub.name}
                    onChange={(e) => setUpdatedClub({ ...updatedClub, name: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
                  />
                </div>
        
                {/* === Description === */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    minLength={10}
                    maxLength={300}
                    value={updatedClub.description}
                    onChange={(e) =>
                      setUpdatedClub({ ...updatedClub, description: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
                    rows={3}
                  />
                </div>
        
                {/* === Type === */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Club Type</label>
                  <select
                    value={updatedClub.typeId}
                    onChange={(e) =>
                      setUpdatedClub({ ...updatedClub, typeId: Number(e.target.value) })
                    }
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
                  >
                    {clubTypes &&
                      clubTypes.map((t: IClubType) => (
                        <option key={t.id} value={t.id}>
                          {t.type}
                        </option>
                      ))}
                  </select>
                </div>
        
                {/* === Image Upload === */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Club Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt="Club Preview"
                      className="mt-2 w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
                    />
                  )}
                </div>
        
                {/* === Open Registration === */}
                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={updatedClub.openForRegistrations}
                      onChange={(e) =>
                        setUpdatedClub({ ...updatedClub, openForRegistrations: e.target.checked })
                      }
                    />
                    Open for registrations
                  </label>
                </div>
        
                {/* === Buttons === */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowUpdateForm(false)}
                    disabled={loading}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading && (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    )}
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
    )
}