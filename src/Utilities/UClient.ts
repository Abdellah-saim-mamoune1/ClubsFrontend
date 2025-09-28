

export function SetBookIdToLocalStorage(Id:number){
     localStorage.setItem("BookId",Id.toString());
    
}

export function SetUserTypeToLocalStorage(type:string){
     localStorage.setItem("UserType",type);
}