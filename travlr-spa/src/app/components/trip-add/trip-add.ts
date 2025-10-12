import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TripsService } from '../../services/trips.service';

@Component({
  selector: 'app-trip-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './trip-add.html',
  styleUrls: ['./trip-add.css']
})
export class TripAdd {
  saving = false;
  error = '';
  form!: FormGroup;

  constructor(private fb: FormBuilder, private trips: TripsService, private router: Router) {
    this.form = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: [5, Validators.required],
      start: ['', Validators.required],
      perPerson: [999, Validators.required],
      resort: [''],
      image: [''],
      description: ['']
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.saving = true;
    const v = this.form.value as any;

    const body = {
      code: String(v.code).trim(),
      name: String(v.name).trim(),
      length: Number(v.length),
      perPerson: Number(v.perPerson),
      resort: v.resort ? String(v.resort).trim() : undefined,
      image: v.image ? String(v.image).trim() : undefined,
      description: v.description ? String(v.description).trim() : undefined,
      start: v.start ? new Date(v.start).toISOString() : undefined
    };

    this.trips.create(body as any).subscribe({
      next: () => this.router.navigate(['/trips']),
      error: (e) => {
        console.error('POST /api/trips failed', e);
        this.error = e?.error?.message || e?.message || 'Failed to create trip';
        this.saving = false;
      }
    });
  }
}
