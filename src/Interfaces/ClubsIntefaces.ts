export interface IClub{
  id: number;
  name: string;
  type: string;
  imageUrl: string;
  description: string;
  eventsNumber: number;
  membersNumber: number;
}

export interface IClubState{
NewClubs:IClub[]|null|false;
MostActiveClubs:IClub[]|null|false;

}