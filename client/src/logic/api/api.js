

const BASE_URL = `http://localhost:3001/api`
const USER_URL = `${BASE_URL}/user`
const ROOM_URL = `${BASE_URL}/room`

const REGISTER_URL = `/register`
const LOGIN_URL = `/login`
const CREATE_URL = `/create`
const CHECK_ACCESS_URL = `/check-access` // :id
const CONNECT_URL = `/connect` // :id

const METHODS = {
   GET: `GET`,
   POST: `POST`,
   PUT: `PUT`,
   DELETE: `DELETE`
}

const DEFAULT_HEADERS = {
   "content-type": "application/json"
}



const api = {
   postRegisterUser: async ({ body }) => {
      const jsonBody = JSON.stringify(body)
      const response = await fetch(USER_URL + REGISTER_URL, {
         method: METHODS.POST,
         body: jsonBody,
         headers: DEFAULT_HEADERS,
      })
      return await response.json()
   },
   postLoginUser: async ({ body }) => {
      const jsonBody = JSON.stringify(body)
      const response = await fetch(USER_URL + LOGIN_URL, {
         method: METHODS.POST,
         body: jsonBody,
         headers: DEFAULT_HEADERS,
      })
      return await response.json()
   },
   postCreateRoom: async ({ body, headers = {} }) => {
      const jsonBody = JSON.stringify(body)
      const response = await fetch(ROOM_URL + CREATE_URL, {
         method: METHODS.POST,
         body: jsonBody,
         headers: { ...DEFAULT_HEADERS, ...headers },
      })
      return await response.json()
   },
   getMyUserData: async ({ headers = {} }) => {
      const response = await fetch(USER_URL, {
         method: METHODS.GET,
         headers: { ...DEFAULT_HEADERS, ...headers },
      })
      return await response.json()
   },
   getCheckRoom: async ({ headers = {}, params }) => {
      const response = await fetch(ROOM_URL + CHECK_ACCESS_URL + `/${params.roomId}`, {
         method: METHODS.GET,
         headers: { ...DEFAULT_HEADERS, ...headers },
      })
      return await response.json()
   },
   postEnterRoomPass: async ({ headers = {}, params, body = {} }) => {
      const jsonBody = JSON.stringify(body)
      const response = await fetch(ROOM_URL + CONNECT_URL + `/${params.roomId}`, {
         method: METHODS.POST,
         headers: { ...DEFAULT_HEADERS, ...headers },
         body: jsonBody
      })
      return await response.json()
   },
}

export { api }