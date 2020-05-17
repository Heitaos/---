import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubmitcontextPage } from './submitcontext.page';

describe('SubmitcontextPage', () => {
  let component: SubmitcontextPage;
  let fixture: ComponentFixture<SubmitcontextPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitcontextPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubmitcontextPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
