export type Article = {
    title: string
    body: string
    author: {
        userId: number;
        name: string
    }
    createdAt: string
    updatedAt: string
}