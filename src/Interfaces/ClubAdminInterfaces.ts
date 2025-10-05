export interface IClubUpdate{
    clubId:number;
    name:string;
    description:string;
    typeId:number;
    imageUrl:string;
    openForRegistrations:boolean;
}

export interface IClubApplicationRequest{
    applicationId:number;
    studentId:number;
    studentName:string;
    studentImageUrl:string;
    studentEmail:string;
    studentMotivation:string;
    date:string;
}

export interface IEventSet{

  title: string;
  content: string;
  date: string;         
  from: string;         
  to: string;         
  clubId:number; 
  address: string;
  isPrivate: boolean;
  maxRegistrationsCount:number;
}

export interface IEventUpdate{
  
  id:number; 
  title: string;
  content: string;
  date: string;         
  from: string;         
  to: string;         
  address: string;
  isPrivate: boolean;
  maxRegistrationCount:number;



}