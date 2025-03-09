import { Component, Input } from '@angular/core';
import { Room } from '../../Models/HotelModal';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room',
  imports: [FormsModule,CommonModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {
  @Input() room!: Room;
}
