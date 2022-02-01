import { Form } from '@models/form.model';
import { RecentForm } from '@models/recent-form.model';

export interface FormState {
    forms: Form[];
    recentForms: RecentForm[];
    errorFetchingForms: {
        status: boolean;
        message: string;
    };
    isSavingForm: boolean;
    searchFormTitle: string;
}
