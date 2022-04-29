export interface IUserInterest {
    id?: number,
    active: boolean,
    category: string,
    keywords: IKeywords,
    region: string,
    timeValObject?: any,                  // ! FIX: Ne treba da bide any, sega e unused
    version?: number

    foundAdverts: [IFoundAdvert]
}

export interface IFoundAdvert {
    id?: number,
    alreadyShownToUser: boolean,
    imageUrl: string,
    price: string,
    title: string,
    url: string,
    version?: number
}

export interface IKeywords {
    mainKeyword: string,
    otherKeywords?: [string]
}