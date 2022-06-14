export interface IUserInterest {
    id?: number,
    active: boolean,
    category: string,
    keywords: IKeywords,
    region: string,
    timeValObject?: any,                  // ! FIX: Ne treba da bide any, sega e unused
    version?: number

    foundAdverts?: IFoundAdvert[]
}

export interface IFoundAdvert {
    id?: number,
    alreadyShownToUser: boolean,
    imageUrl: string,
    price: string,
    title: string,
    url: string,
    carYear: number,
    carMileage: number,
    version?: number
}

export interface IUserAdvert {
    id?: number,
    isActive?: boolean,
    image?: File | undefined,
    title: string,
    description: string,
    category: string,
    region: string,
    price: string,
    contactInfo: string,
    version?: number
}

export interface IKeywords {
    mainKeyword: string,
    otherKeywords?: [string]
}

export interface IFoundAdvertDTO {
    foundAdId: number,
    imageUrl: string,
    price: string,
    title: string,
    url: string,

    carYear: number,
    carMileage: number,

    userInterestId: number,
    userEmail?: string
}

export interface IAuth0UserInfo {
    name: string,
    email: string,
    token: string
}

export interface IUser {
    userEmail: string
}