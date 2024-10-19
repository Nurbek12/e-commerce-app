import { Observable } from "rxjs"

declare type ObservableGRPCService<T> = {
    [K in keyof T]: (arg: Parameters<T[K]>[0]) => Observable<ReturnType<T[K]>>
}

declare type PaginationFields = 'page' | 'limit' | 'orderBy'

declare type ExcludePaginationFields<T> = Omit<T, PaginationFields>
declare type PickPaginationFields<T> = Partial<Pick<T, PaginationFields>>