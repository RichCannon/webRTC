
export type OnChangeT<T = HTMLInputElement> = React.ChangeEventHandler<T>
export type OnClickT<T = HTMLInputElement> = React.MouseEventHandler<T>
export type OnSubmitT<T = HTMLFormElement> = React.FormEventHandler<T>

export type DefaultReqDataT<D> = {
  data: D
  fetching: boolean
  error: null | DefaultReqErrorT
}

export type DefaultReqErrorT = { message: string, param: string, statusCode?: number }