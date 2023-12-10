export type JournalType = {
    id: string,
    title?: string | undefined,
    content: string,
    createdAt: Date,
    modifiedAt?: Date
}