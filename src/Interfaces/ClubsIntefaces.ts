export interface IClub{
  id: number;
  name: string;
  type: string;
  imageUrl: string;
  description: string;
  eventsNumber: number;
  membersNumber: number;
}

export interface IEvent {
  id: number;
  title: string;
  content: string;
  date: string;         
  from: string;         
  to: string;          
  address: string;
  isPrivate: boolean;
  views: number;
  clubName:string;
  isUserJoined: boolean;
  registrationInfo: string | null;
}

export interface IClubState{
NewClubs:IClub[]|null|false;
MostActiveClubs:IClub[]|null|false;
LatestEvents:IEvent[]|null|false

}