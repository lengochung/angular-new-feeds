class Comment {
    id?: string
    name?: string
    imageURL?: string
    userID?: string
    content?:string
    created_at?: number
    comments?: Comment[]
}

export default Comment