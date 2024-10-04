export interface SubCategory {
    id: number;
    name: string;
    categoryName: string;
    categoryIsActive: string;
    isActive: boolean;
}

export interface WishList {
    id: number;
    wishListed: boolean;
}

export interface Products {
    id: number;
    name: string;
    description: string;
    price: number;
    categoryName: string;
    subCategoryName: string;
    image: string;
    isActive: boolean;
  }
export interface SignUpValues {
    firstName : string;
    lastName : string;
    emailAddress : string;
    password : string;
    address : string;
    phoneNumber : string;
    isTnCApplied : boolean;
}

export interface Categories {
    id: number;
    name: string;
    isActive: boolean;
}

export interface CartDetails {
    id: number;
    productId: number;
    image: string;
    productName: string;
    productPrice: string;
    productTotalAmount: number;
    quantity: number;
    userEmail: string;

}

export interface WishListDetails{
    id: number;
    image: string;
    productDescription: string;
    productName: string;
    productPrice: number;
    userEmail: string;
}

export interface UpdateCart{
    productId: number;
    userId: number;
    quantity: number;
}