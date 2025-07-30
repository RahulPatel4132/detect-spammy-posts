import { Component, signal } from '@angular/core';
import {
  PostService,
  ModerationResponse,
  ModerationStatus,
} from './post.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'post-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
  ],
  template: `
    <mat-card class="tweet-card">
      <mat-card-title>Tweet checker</mat-card-title>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Write something (280 chars)</mat-label>
        <textarea matInput maxlength="280" rows="4" [(ngModel)]="text">
        </textarea>
        <mat-hint align="end">{{ 280 - text.length }}</mat-hint>
      </mat-form-field>

      <button
        mat-raised-button
        color="primary"
        (click)="submit()"
        [disabled]="!text.trim()"
      >
        Submit
      </button>

      <ng-container *ngIf="result() as r">
        <mat-card
          class="result-card"
          [ngClass]="{
            accepted: r.status === 'ACCEPTED' || r.status === 'POSTED',
            flagged: r.status === 'FLAGGED',
            error: r.status === 'ERROR'
          }"
        >
          <mat-card-title>
            <mat-icon *ngIf="r.status === 'ACCEPTED' || r.status === 'POSTED'"
              >check_circle</mat-icon
            >
            <mat-icon *ngIf="r.status === 'FLAGGED'">report</mat-icon>
            <mat-icon *ngIf="r.status === 'ERROR'">error</mat-icon>
            {{ r.status }}
          </mat-card-title>

          <div *ngIf="r.reasons?.length">
            <mat-chip-listbox>
              <mat-chip-option
                *ngFor="let reason of r.reasons"
                color="warn"
                selected
              >
                {{ reason }}
              </mat-chip-option>
            </mat-chip-listbox>
          </div>

          <a *ngIf="r.link" [href]="r.link" target="_blank">View on X</a>
        </mat-card>
      </ng-container>
    </mat-card>
  `,
  styles: [
    `
      .tweet-card {
        max-width: 480px;
        margin: 2rem auto;
      }
      .full-width {
        width: 100%;
      }
      .result-card {
        margin-top: 1rem;
      }
      .accepted {
        border-left: 4px solid #4caf50;
      }
      .flagged {
        border-left: 4px solid #f44336;
      }
      .error {
        border-left: 4px solid #ff9800;
      }
      mat-card-title mat-icon {
        vertical-align: middle;
        margin-right: 0.25rem;
      }
    `,
  ],
})
export class PostFormComponent {
  text = '';
  result = signal<ModerationResponse | null>(null);

  constructor(private api: PostService) {}

  colorOf(status: ModerationStatus) {
    return status === 'FLAGGED' || status === 'ERROR' ? 'red' : 'green';
  }
  submit() {
    this.api.submit(this.text).subscribe({
      next: (res) => this.result.set(res), // HTTP 2xx
      error: (err) => {
        if (err.error?.status) {
          // our API returns JSON even on 400
          this.result.set(err.error as ModerationResponse);
        } else {
          this.result.set({
            status: 'ERROR',
            reasons: ['Network or server error'],
          } as any);
        }
      },
    });
  }
}
