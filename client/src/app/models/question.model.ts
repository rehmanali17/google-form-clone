export interface Question {
    _id?: string;
    question: string;
    type: string;
    options: string[];
    isRequired: boolean;
}
