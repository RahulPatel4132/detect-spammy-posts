import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type ModerationStatus = 'ACCEPTED' | 'FLAGGED' | 'POSTED' | 'ERROR';

export interface ModerationResponse {
  status: ModerationStatus;
  reasons?: string[];
  link?: string;     
}

export class PostService {
  private http = inject(HttpClient);
  private api = 'http://localhost:4000/posts';

  submit(text: string): Observable<ModerationResponse> {
    return this.http.post<ModerationResponse>(this.api, { text });
  }
}
