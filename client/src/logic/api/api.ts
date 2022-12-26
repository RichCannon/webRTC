

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

const fetchInstance = async ({ url, method = METHODS.GET, body = null, headers = {} }) => {
   const options = {
      method,
      headers: { ...DEFAULT_HEADERS, ...headers },
   }

   if (body) {
      options.body = JSON.stringify(body)
   }

   const response = await fetch(url, options)
   if (!response.ok) {
      throw await response.json()
   }
   return await response.json()
}



const api = {
   postRegisterUser: async ({ body }) =>
      await fetchInstance({ url: USER_URL + REGISTER_URL, method: METHODS.POST, body })
   ,
   postLoginUser: async ({ body }) =>
      await fetchInstance({ url: USER_URL + LOGIN_URL, method: METHODS.POST, body })
   ,
   postCreateRoom: async ({ body, headers = {} }) =>
      await fetchInstance({ url: ROOM_URL + CREATE_URL, body, headers, method: METHODS.POST })
   ,
   getMyUserData: async ({ headers = {} }) =>
      await fetchInstance({ url: USER_URL, headers })
   ,
   getCheckRoom: async ({ headers = {}, params }) =>
      await fetchInstance({ url: `${ROOM_URL}${CHECK_ACCESS_URL}/${params.roomId}`, headers })
   ,
   postEnterRoomPass: async ({ headers = {}, params, body = {} }) =>
      await fetchInstance({ url: `${ROOM_URL}${CONNECT_URL}/${params.roomId}`, method: METHODS.POST, body, headers })
   ,
}

export { api }