import { User } from './User.interface'

export interface Post {
  _id: string
  title: string
  description: string
  category: string
  imageUrl: string
  favoriteAmount: number
  create_at: string
  user: User
}
