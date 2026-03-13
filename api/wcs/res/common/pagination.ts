export enum SortOrder {
  ASC = 1,
  DESC = 2,
}

type TApiReqPaginationReqModel = {
  take?: number
  currentPage?: number
  isPaging: boolean
}

type TApiReqSortingModel<T extends string | number | symbol> = {
  sortColumn?: T | 'modifiedAt' | 'Default' | 'createdAt'
  sortOrder?: SortOrder
}

/**
 * R - type of row (API response model). For `sortColumn`'s default intellisense
 *
 * F - type of filter model (API request model)
 *
 * C - string literal of sorting columns. Default: keyof R
 */
export type TApiReqSearchModel<
  R extends Record<string, unknown>,
  F extends Record<string, unknown>,
  C extends string | number | symbol = keyof R,
> = TApiReqPaginationReqModel & TApiReqSortingModel<C> & F

// #endregion

export type TApiResPaginationModel = {
  totalRecords: number
  recordsPerPage?: number
  totalPages?: number
  currentPage?: number
}
