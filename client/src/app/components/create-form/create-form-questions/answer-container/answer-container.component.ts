import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-answer-container',
    templateUrl: './answer-container.component.html',
    styleUrls: ['./answer-container.component.scss'],
})
export class AnswerContainerComponent {
    @Input() questionType = '';
    constructor() {}
}
