import { Question } from '@models/question.model';
export interface Form {
    _id?: string;
    userId?: string;
    title: string;
    description: string;
    status: string;
    questions: Question[];
    createdAt?: Date;
    updatedAt?: Date;
}
