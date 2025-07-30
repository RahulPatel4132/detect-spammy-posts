import { Component, signal } from '@angular/core';
import { PostFormComponent } from './post-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PostFormComponent],
  template: `<post-form></post-form>`,
})
export class App {
  protected readonly title = signal('ui');
}
