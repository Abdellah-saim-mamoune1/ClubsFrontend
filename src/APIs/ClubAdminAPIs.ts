
import { IClubUpdate, IEventSet, IEventUpdate } from "../Interfaces/ClubAdminInterfaces";
import api from "./API";



export async function ClubEventAddAPI(UserId:number,form:IEventSet){
  try{
      await api.post(`club/admin/event/${UserId}`,form);    
      return true;

  } catch (error: any) {
  return false;
  }
}

export async function ClubEventUpdateAPI(UserId:number,form:IEventUpdate){
  try{
      await api.put(`club/admin/event/${UserId}`,form);    
      return true;

  } catch (error: any) {
  return false;
  }
}

export async function ClubEventDeleteAPI(UserId:number,EventId:number){
  try{
      await api.delete(`club/admin/event/${UserId},${EventId}`);    
      return true;

  } catch (error: any) {
  return false;
  }
}

export async function ClubUpdateAPI(UserId:number,form:IClubUpdate){
  try{
      await api.put(`club/admin/${UserId}`,form);    
      return true;

  } catch (error: any) {
  return false;
  }
}
export async function GetApplicationsRequestsAPI(ClubId:number,PageNumber:number,PageSize:number){
  try{
      const response=await api.get(`club/admin/candidates/${ClubId},${PageNumber},${PageSize}`);    
      return response.data.data;

  } catch (error: any) {
  return false;
  }
}

export async function AcceptApplicationAPI(ApplicationId:number,UserId:number,ClubId:number){
  try{
      await api.post(`club/admin/candidate/accept/${ApplicationId},${UserId},${ClubId}`);    
      return true;

  } catch (error: any) {
  return false;
  }
}


export async function RefuseApplicationAPI(applicationId:number){
  try{
      await api.post(`club/admin/candidate/refuse/${applicationId}`);    
      return true;

  } catch (error: any) {
  return false;
  }
}

export async function SetMemberAsAdminAPI(UserId:number,ClubId:number){
  try{
      await api.put(`club/admin/member/set-as-admin/${UserId},${ClubId}`);    
      return true;

  } catch (error: any) {
  return false;
  }
}

export async function RemoveMemberAPI(UserId:number,ClubId:number){
  try{
      await api.delete(`club/admin/member/${UserId},${ClubId}`);    
      return true;

  } catch (error: any) {
  return false;
  }
}