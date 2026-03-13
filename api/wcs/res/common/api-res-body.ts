import { TErrorDetail } from './error-content'
import { TApiResPaginationModel } from './pagination'

export type T_APIResponse<T, U = unknown> = {
  result: number
  resultCode: 'success' | 'failed' | 'partial success'
  data: T
  errors: TErrorDetail<U>[] | null
  pagination: TApiResPaginationModel | null
}
