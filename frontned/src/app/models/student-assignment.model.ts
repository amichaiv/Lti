export interface Assignment {
    id: number,
    name: string,
    email: string,
    group?: string,
    submissionTime: Date,
    status: string,
    grade: number,
    progressValue: number,
    isCheated: boolean,
    budget: number,
    consumed: number
}

