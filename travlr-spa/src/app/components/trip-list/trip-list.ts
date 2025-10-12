import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TripsService } from '../../services/trips.service';
import { Trip } from '../../services/trip';
import { TripCard } from '../trip-card/trip-card';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, TripCard],
  templateUrl: './trip-list.html',
  styleUrl: './trip-list.css'
})
export class TripList implements OnInit {
  trips = signal<Trip[]>([]);
  loading = signal(false);
  error = signal('');

  constructor(private tripsSvc: TripsService, private router: Router) {}

  ngOnInit(): void { this.fetch(); }

  fetch() {
    this.loading.set(true);
    this.tripsSvc.list().subscribe({
      next: d => { this.trips.set(d); this.loading.set(false); },
      error: e => { this.error.set('Failed to load trips'); this.loading.set(false); console.error(e); }
    });
  }

  onEdit(code: string) { this.router.navigate(['/trips', code, 'edit']); }
  onDelete(code: string) {
    if (!confirm(`Delete trip ${code}?`)) return;
    this.tripsSvc.delete(code).subscribe({
      next: () => this.fetch(),
      error: e => { alert('Delete failed'); console.error(e); }
    });
  }
}
