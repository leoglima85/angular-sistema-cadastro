import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogEventosComponent } from './log-eventos.component';

describe('LogEventosComponent', () => {
  let component: LogEventosComponent;
  let fixture: ComponentFixture<LogEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogEventosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
