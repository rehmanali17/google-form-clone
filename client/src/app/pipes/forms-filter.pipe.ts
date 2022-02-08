import { Pipe, PipeTransform } from '@angular/core';
import { Form } from '@models/form.model';

@Pipe({
    name: 'forms_filter',
})
export class FormsFilterPipe implements PipeTransform {
    transform(forms: Form[], filterTitle: string) {
        if (filterTitle === '') {
            return forms;
        } else {
            return forms.filter((form) => form.title.includes(filterTitle));
        }
    }
}
