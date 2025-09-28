type OrderItem = {
  id: number;
  name: string;
  imageUrl: string;
  quantity: number;
  totalPrice: number;
  createdAt: string;
};



export interface Order {
  id: number;
  clientId: number;
  totalQuantity: number;
  totalPrice: number;
  shipmentAddress: string;
  status: string;
  createdAt: string;
  arrivedAt?: string | null;
  items: OrderItem[];
};

export interface IGetBook {
  id: number;
  name: string;
  image: string;
  pagesNumber: number;
  typeId: number;
  authorId: number;
  description: string;
  publishedAt: string | null;
};


export interface IBookCopy {
  id: number;
  bookId: number;
  quantity: number;
  price: number;
  isAvailable: boolean;
};


export type IAddNewBookCopy={
    bookId:number;
    quantity:number;
    price:number;
    isAvailable:boolean;
}

export interface IUpdateBookCopy extends IAddNewBookCopy{
    Id:number;
   
}


export interface IEmployee{
  UserType:string;
  IsLoggedIn:boolean;
  EmployeeInfo:IGetEmployee|null;
}


export interface IAddEmployee{
person_informations:IPerson;
password:string;
role:string;
}

export interface IPerson{
  firstName:string;
  lastName:string;
  gender:string;
  birthDate:string;
  email:string;
  phoneNumber:string;
  address:string;
}

export interface IGetEmployee extends IPerson{
  id:number;
  type:string;
}