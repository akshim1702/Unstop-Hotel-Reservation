import { Component, Input } from '@angular/core';
import { Room } from '../../Models/HotelModal';
import { RoomComponent } from '../room/room.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-floor',
  imports: [RoomComponent,FormsModule,CommonModule],
  templateUrl: './floor.component.html',
  styleUrl: './floor.component.css'
})
export class FloorComponent {
  @Input() floor!: number;
  @Input() rooms: Room[] = [];
}
