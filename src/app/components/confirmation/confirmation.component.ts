import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { Room } from '../../Models/HotelModal';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation',
  imports: [FormsModule, CommonModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {
  @Input() bookedRooms: Room[] = [];
  @ViewChild('confirmationModal') confirmationModal!: ElementRef;

  openModal() {
    const modal = new Modal(this.confirmationModal.nativeElement);
    modal.show();
  }

  closeModal() {
    const modal = Modal.getInstance(this.confirmationModal.nativeElement);
    modal?.hide();
  }
}
