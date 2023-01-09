
type REQUEST_METHODS = `GET` | `POST` | `PUT` | `DELETE`

export type DefaultAPIInstanceT<B = null, P = null> = {
    body?: B
    headers?: HeadersInit
    params?: P
}

export type FetchInstanceParamsT = {
    url: string,
    method?: REQUEST_METHODS,
    body?: object,
    headers?: HeadersInit
}


export type PostRegisterUserBodyT = {
    login: string,
    password: string,
}

export type PostRegisterUserReturnT = {
    
}

export type PostLoginUserReturnT = {
    token: string
    userName: string
}

export type PostCreateRoomReturnT = {
    id: string
    name: string
}

export type GetMyUserDataReturnT = {
    userName: string
}

export type GetCheckRoomReturnT = {
    connected: boolean
}

export type PostEnterRoomPassReturnT = {
    connected: boolean
}

export type PostLoginUserBodyT = {
    login: string,
    password: string,
}

export type PostCreateRoomBodyT = {
    name: string;
    password: string;
}

export type PostEnterRoomPassBodyT = {
    password: string
}

export type GetCheckRoomParamsT = {
    roomId: string
}

export type PostEnterRoomPassParamsT = GetCheckRoomParamsT