export interface Article {
  id: number
  title: string
  content: string
  createdAt: string
  views: number
  private: boolean
  author: User
}

export interface User {
  id: number
  roles: ('USER' | 'ADMIN' | 'MODERATOR')[]
  email: string
  avatarUrl: string
  username: string
  totalArticles: number
}
