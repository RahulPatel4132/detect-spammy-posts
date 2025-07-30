import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { PostFormComponent } from './app/post-form.component';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from './app/post.service';


bootstrapApplication(PostFormComponent, {
  providers: [
    provideHttpClient(),
    PostService,
    importProvidersFrom(FormsModule),
  ]
}).catch(err => console.error(err));