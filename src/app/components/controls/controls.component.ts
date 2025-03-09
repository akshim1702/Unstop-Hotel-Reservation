import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-controls',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.css'
})
export class ControlsComponent implements OnInit {
  roomForm!: FormGroup;  // Use non-null assertion here

  @Output() bookRooms = new EventEmitter<number>();
  @Output() generateRandom = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.roomForm = this.fb.group({
      numRooms: [1, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  get numRooms() {
    return this.roomForm.get('numRooms');
  }

  onBook() {
    if (this.roomForm.invalid) {
      return;
    }
    // Emit the number of rooms when valid
    this.bookRooms.emit(this.numRooms?.value);
  }

  onGenerateRandom() {
    this.generateRandom.emit(); // Emit the random event
  }

  onReset() {
    this.roomForm.reset({ numRooms: 1 });
    this.reset.emit(); // Emit the reset event
  }

  
}
