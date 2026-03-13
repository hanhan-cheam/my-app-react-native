export type T_APIErrorResponse = {
  data: null
  errors?: TErrorsBody[]
  Error?: TErrorBody
  pagination: null
  result: number
  resultCode: string
}

type TErrorsBody = {
  code: number
  message: string
  model: unknown
  status: number
  statusCode: string
}

type TErrorBody = {
  Code: number
  Message: string
  Model: unknown
  Status: number
  StatusCode: string
}
