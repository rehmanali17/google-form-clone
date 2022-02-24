import { Pipe, PipeTransform } from '@angular/core';
import { Form } from '@models/form.model';

@Pipe({
    name: 'dropdown_filter',
})
export class DropdownFilterPipe implements PipeTransform {
    transform(forms: Form[], filterTitle: string) {
        if (filterTitle) {
            return forms.filter((form) => form.title.includes(filterTitle));
        } else {
            return [];
        }
    }
}
