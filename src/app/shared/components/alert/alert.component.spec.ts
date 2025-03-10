import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { signal } from '@angular/core';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    fixture.componentRef.setInput("message", "test message")
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create default alert component', () => {
    const message = "alert message"
    fixture.componentRef.setInput("message", message)
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component).toBeTruthy();
    expect(compiled.querySelector('div[role="alert"]')?.textContent).toContain(message)
    expect(compiled.querySelector('div[role="alert"]')?.className).toContain('bg-blue-100')
  });

  it('should create error alert component', () => {
    const message = "error message"
    fixture.componentRef.setInput("message", message)
    fixture.componentRef.setInput("type", "error")
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component).toBeTruthy();
    expect(compiled.querySelector('div[role="alert"]')?.textContent).toContain(message)
    expect(compiled.querySelector('div[role="alert"]')?.className).toContain('bg-red-100')
  });
});
