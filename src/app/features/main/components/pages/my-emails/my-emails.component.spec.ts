import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEmailsComponent } from './my-emails.component';

describe('MyEmailsComponent', () => {
  let component: MyEmailsComponent;
  let fixture: ComponentFixture<MyEmailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyEmailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
