import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {SubmitlistPage} from './submitlist.page';

describe('SubmitlistPage', () => {
    let component: SubmitlistPage;
    let fixture: ComponentFixture<SubmitlistPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SubmitlistPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(SubmitlistPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
