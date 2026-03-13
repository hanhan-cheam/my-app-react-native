export type TErrorDetail<T> = {
  code: string
  message: string
  model: T
  status: number
  statusCode: string
}
