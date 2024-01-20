export interface Region {
    ID: number,
    District: string,
    Name: string,
    Details: string,
    Status: string,
    AreaKm: string,
    Population: number,
    HeadName: string,
    HeadEmail: string,
    HeadPhone: string,
    AverageHeightM: number,
    ImageName: string 
}

export interface User {
    UUID: string,
    Role: number,
    name: string,
    Pass: string

}

export interface Flight {
    ID: number,
    Status: string,
    DateCreated?: string,
    DateProcessed?: string,
    DateFinished?: string,
    TakeoffDate: string,
    ArrivalDate: string,
    ModeratorRefer?: string,
    UserRefer?: string,
    Moderator?: User,
    User?: User 
    AllowedHours?: string,
}
