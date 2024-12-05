export interface PageDTO<T> {
  content: T[],
  page: {
    size: number,
    number: number,
    totalElements: number,
    totalPages: 7
  }
}

export interface CreateArticleDto {
  title: string,
  content: string
}
