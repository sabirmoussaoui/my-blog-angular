import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSettingComponent } from './book-setting.component';

describe('BookSettingComponent', () => {
  let component: BookSettingComponent;
  let fixture: ComponentFixture<BookSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
