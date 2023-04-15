import { DefaultReqErrorT } from "@/types/common"
import {
   DefaultAPIInstanceT,
   FetchInstanceParamsT,
   GetCheckRoomParamsT,
   GetCheckRoomReturnT,
   GetMyUserDataReturnT,
   PostCreateRoomBodyT,
   PostCreateRoomReturnT,
   PostEnterRoomPassBodyT,
   PostEnterRoomPassParamsT,
   PostEnterRoomPassReturnT,
   PostLoginUserBodyT,
   PostLoginUserReturnT,
   PostRegisterUserBodyT,
   PostRegisterUserReturnT
} from "./types"


const BASE_URL = `http://localhost:3001/api`
const USER_URL = `${BASE_URL}/user`
const ROOM_URL = `${BASE_URL}/room`

const REGISTER_URL = `/register`
const LOGIN_URL = `/login`
const CREATE_URL = `/create`
const CHECK_ACCESS_URL = `/check-access` // :id
const CONNECT_URL = `/connect` // :id

const DEFAULT_HEADERS = {
   "content-type": "application/json"
}

async function fetchInstance<R>({ url, method = `GET`, body, headers = {} }: FetchInstanceParamsT) {
   const options: RequestInit = {
      method,
      headers: { ...DEFAULT_HEADERS, ...headers },
   }

   if (body) {
      options.body = JSON.stringify(body)
   }

   const response = await fetch(url, options)

   if (!response.ok) {
      const errorObj = await response.json()
      throw { statusCode: response.status, ...errorObj } as DefaultReqErrorT
   }
   return await response.json() as Promise<R>
}



const api = {
   postRegisterUser: async ({ body }: DefaultAPIInstanceT<PostRegisterUserBodyT>) =>
      await fetchInstance<PostRegisterUserReturnT>({ url: USER_URL + REGISTER_URL, method: `POST`, body })
   ,
   postLoginUser: async ({ body }: DefaultAPIInstanceT<PostLoginUserBodyT>) =>
      await fetchInstance<PostLoginUserReturnT>({ url: USER_URL + LOGIN_URL, method: `POST`, body })
   ,
   postCreateRoom: async ({ body, headers = {} }: DefaultAPIInstanceT<PostCreateRoomBodyT>) =>
      await fetchInstance<PostCreateRoomReturnT>({ url: ROOM_URL + CREATE_URL, body, headers, method: `POST` })
   ,
   getMyUserData: async ({ headers = {} }: DefaultAPIInstanceT) =>
      await fetchInstance<GetMyUserDataReturnT>({ url: USER_URL, headers })
   ,
   getCheckRoom: async ({ headers = {}, params }: DefaultAPIInstanceT<null, GetCheckRoomParamsT>) =>
      await fetchInstance<GetCheckRoomReturnT>({ url: `${ROOM_URL}${CHECK_ACCESS_URL}/${params!.roomId}`, headers })
   ,
   postEnterRoomPass: async ({ headers = {}, params, body }: DefaultAPIInstanceT<PostEnterRoomPassBodyT, PostEnterRoomPassParamsT>) =>
      await fetchInstance<PostEnterRoomPassReturnT>
         ({ url: `${ROOM_URL}${CONNECT_URL}/${params!.roomId}`, method: `POST`, body, headers })
   ,
}

export { api }