import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class Button {
  @Input() id: string = 'dfltButton';
  @Input() type: 'submit' | 'button' = 'button';
  @Input() label: string = 'Button';
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter<any>();

  emitClick(): any {
    this.onClick.emit();
  }
}
