import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TripsService } from '../../services/trips.service';

@Component({
  selector: 'app-trip-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './trip-edit.html',
  styleUrl: './trip-edit.css'
})
export class TripEdit implements OnInit {
  code = '';
  loading = signal(false);
  saving = signal(false);
  error = signal('');

  // declare first
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private trips: TripsService,
    private router: Router
  ) {
    // initialize here
    this.form = this.fb.group({
      name: ['', Validators.required],
      length: [5, Validators.required],
      start: ['', Validators.required],
      perPerson: [999, Validators.required],
      resort: [''],
      image: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code') || '';
    if (!this.code) { this.error.set('Missing trip code'); return; }
    this.loading.set(true);
    this.trips.getByCode(this.code).subscribe({
      next: (t) => {
        this.form.patchValue({
          name: t.name,
          length: t.length,
          start: (t.start || '').substring(0,10),
          perPerson: t.perPerson,
          resort: t.resort || '',
          image: t.image || '',
          description: t.description || ''
        });
        this.loading.set(false);
      },
      error: (e) => { this.error.set('Failed to load trip'); this.loading.set(false); console.error(e); }
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.saving.set(true);
    this.trips.update(this.code, this.form.value as any).subscribe({
      next: () => this.router.navigate(['/trips']),
      error: (e) => { this.error.set('Failed to save changes'); this.saving.set(false); console.error(e); }
    });
  }
}
