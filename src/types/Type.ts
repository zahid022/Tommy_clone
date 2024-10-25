export interface FooterLinks {
    id: number;
    name: string;
    links: Array<string>;
}

export interface CartUserType {
    productId: string;
    count: number ;
    color : string;
    size : string;
    price : number;
}

export interface PromoCodeType {
    name : string;
    precent : string;
}

export interface CartAddType {
    id : string;
    arr : CartUserType[]
}

export interface UserType {
    firstName : string;
    lastName : string;
    email : string;
    password : string;
    token : string;
    role : string;
    cart : CartUserType[]
    id : string;
}

export interface Category {
    img?: string;
    name: string;
    slug: string;
    id: string;
}

export interface GeneralCategory {
    name: string;
    slug: string;
    id: number;
}

export interface Sub {
    name: string;
    categoryId: string;
    id: string;
}

export interface SubCategory {
    name: string;
    slug: string;
    categoryId: number;
    subId: number;
    id: number;
}

export interface SignInValues {
    email: string;
    password: string;
}

export interface CreateAccountValues extends SignInValues {
    id?: number;
    img?: string;
    token?: string;
    role?: string;
    cart?: CartUserType[];
    firstName: string;
    lastName: string;
}

export interface FilterState {
    priceRange: number[];
    size : string;
    color : string;
}

export interface BasketState { 
    basket : CartUserType[];
    userId : string;
    flag : boolean;
    cart : boolean;
}

export interface ProductType {
    id ?: string;
    categoryName : string;
    subcategoryName : string;
    generalcategoryName : string;
    subName? : string;
    color? : string[];
    size ?: string[];
    price : number | string;
    discount : number | string;
    images ?: string[];
    rating : number | string;
    name : string;
    description : string;
    details? : string[]
}

export interface Filters {
    category: string;
    subCategory : string;
    generalCategory : string;
}