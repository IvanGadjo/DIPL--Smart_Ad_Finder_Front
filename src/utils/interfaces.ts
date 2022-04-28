export interface IUserInterest {
    active: boolean,
    category: string,
    foundAdverts: [IFoundAdvert],
    id: number,
    keywords?: IKeywords,
    region: string,
    timeValObject: any,                  // ! FIX: Ne treba da bide any, sega e unused
    version?: number
}

export interface IFoundAdvert {
    alreadyShownToUser: boolean,
    id: number,
    imageUrl: string,
    price: string,
    title: string,
    url: string,
    version?: number
}

export interface IKeywords {
    mainKeyword: string,
    otherKeywords: [string]
}