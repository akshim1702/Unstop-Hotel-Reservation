import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ControlsComponent } from '../../components/controls/controls.component';
import { FloorComponent } from '../../components/floor/floor.component';
import { Room } from '../../Models/HotelModal';
import { ConfirmationComponent } from '../../components/confirmation/confirmation.component';

@Component({
  selector: 'app-reservation',
  imports: [FormsModule, CommonModule, ControlsComponent, FloorComponent, ConfirmationComponent],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {
  rooms: Room[] = [];
  floors = Array.from({ length: 10 }, (_, i) => i + 1);
  bookedRooms: Room[] = [];

  @ViewChild(ConfirmationComponent) confirmationModal!: ConfirmationComponent;

  constructor() {
    this.generateRooms();
  }

  private generateRooms() {
    this.rooms = [];
    for (let floor = 1; floor <= 9; floor++) {
      for (let pos = 0; pos < 10; pos++) {
        this.rooms.push({ number: floor * 100 + (pos + 1), floor, position: pos, booked: false });
      }
    }
    for (let pos = 0; pos < 7; pos++) {
      this.rooms.push({ number: 1000 + (pos + 1), floor: 10, position: pos, booked: false });
    }
  }

  bookRooms(numRooms: number) {
    this.bookedRooms = [];
    const availableRooms = this.rooms.filter(room => !room.booked);
    this.bookedRooms = this.findOptimalRooms(availableRooms, numRooms);

    this.bookedRooms.forEach(room => {
      const index = this.rooms.findIndex(r => r.number === room.number);
      this.rooms[index].booked = true;
    });

    this.confirmationModal.openModal();
  }

  private findOptimalRooms(availableRooms: Room[], count: number): Room[] {
    const floorGroups = new Map<number, Room[]>();
    availableRooms.forEach(room => {
      if (!floorGroups.has(room.floor)) {
        floorGroups.set(room.floor, []);
      }
      floorGroups.get(room.floor)?.push(room);
    });

    for (const [floor, rooms] of floorGroups.entries()) {
      if (rooms.length >= count) {
        const sorted = [...rooms].sort((a, b) => a.position - b.position);
        let bestStart = 0;
        let minSpread = Infinity;

        for (let i = 0; i <= sorted.length - count; i++) {
          const spread = sorted[i + count - 1].position - sorted[i].position;
          if (spread < minSpread) {
            minSpread = spread;
            bestStart = i;
          }
        }
        return sorted.slice(bestStart, bestStart + count);
      }
    }

    return availableRooms.slice(0, count);
  }

  generateRandom() {
    this.rooms.forEach(room => {
      room.booked = Math.random() < 0.3;
    });
  }

  reset() {
    this.generateRooms();
  }

  getRoomsForFloor(floor: number): Room[] {
    return this.rooms.filter(r => r.floor === floor).sort((a, b) => a.position - b.position);
  }

}
