import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Button } from './button';

describe('Button Component', () => {
  let fixture: ComponentFixture<Button>;
  let component: Button;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the default label', () => {
    fixture.detectChanges();
    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.textContent.trim()).toBe('Button');
  });

  it('should update label when input changes', () => {
    component.label = 'Click me';
    fixture.detectChanges();
    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.textContent.trim()).toBe('Click me');
  });

  it('should emit onClick event when emitClick() is called', () => {
    spyOn(component.onClick, 'emit');

    component.emitClick();

    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('should have correct button type attribute', () => {
    component.type = 'submit';
    fixture.detectChanges();

    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.getAttribute('type')).toBe('submit');
  });

  it('should apply correct class for context "header"', () => {
    component.context = 'header';
    fixture.detectChanges();

    expect(component.getButtonClass()).toContain('bg-primary-700');
  });

  it('should return correct classes for all context cases', () => {
    const contexts: { context: Button['context'], expectedClassSnippet: string }[] = [
      { context: 'header', expectedClassSnippet: 'bg-primary-700' },
      { context: 'task-create', expectedClassSnippet: 'bg-primary-700' },
      { context: 'task-update', expectedClassSnippet: 'bg-primary-700' },
      { context: 'task-delete', expectedClassSnippet: 'bg-red-700' },
      { context: 'form', expectedClassSnippet: 'w-full' },
    ];

    contexts.forEach(({ context, expectedClassSnippet }) => {
      component.context = context;
      fixture.detectChanges();
      const classes = component.getButtonClass();
      expect(classes).toContain(expectedClassSnippet, `Context: ${context}`);
    });
  });
});
