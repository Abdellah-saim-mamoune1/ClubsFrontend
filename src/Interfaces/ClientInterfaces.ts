import { Book } from "./PublicInterfaces"

export interface IClient{
    IsLoogedIn:boolean
    ClientInfo:IGetClientInfo|null
    
}

export interface IContactUs{
userName:string;
account:string;
message:string;
}

interface IAccount{
  account:string;
  password:string
}
export interface ISignUp{
  firstName:string;
  lastName:string;
  phoneNumber:string;
  account_informations:IAccount;
}

export interface IRestPassword{
 oldPassword:string;
 newPassword:string;

}


export interface IGetClientInfo{
 firstName:string;
 lastName:string;
 phoneNumber:string;
 account:string;
}

export interface IAddOrder{
  shipmentAddress:string;
  totalQuantity:number;
  totalPrice:number;
  cartItemsIds:number[];
}
export interface IUpdateClientInfo{
 firstName:string;
 lastName:string;
 phoneNumber:string;
}

export interface DecreaseProductQuantity{
  Id:number,
  Type:string
}
export interface CartItemInfo{
  Id:number
  Product:Book
}



export interface CartInfo{
    Quantity:number
    Products:CartItemInfo[]|null
}



export interface UpdateCartItem{
  cartItemId:number;
  quantity:number
}




export interface CDGetOrderItem {
  id: number;
  name: string;
  imageUrl: string;
  quantity: number;
  totalPrice: number;
  createdAt: string; // ISO 8601 date string
}

export interface CDGetOrder {
  id: number;
  totalQuantity: number;
  totalPrice: number;
  shipmentAddress: string;
  status: string;
  createdAt: string; // ISO 8601 date string
  arrivedAt?: string | null; // optional because it's nullable
  items?: CDGetOrderItem[]; // optional like in the C# model
}

// Pagination base interface, assuming it's like this:
export interface DPagination {
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface DCGetPaginatedOrder extends DPagination {
  orders: CDGetOrder[]; // optional like in the C# model
}
