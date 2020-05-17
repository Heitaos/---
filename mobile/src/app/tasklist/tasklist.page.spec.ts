import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {TasklistPage} from './tasklist.page';

describe('TasklistPage', () => {
    let component: TasklistPage;
    let fixture: ComponentFixture<TasklistPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TasklistPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(TasklistPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
