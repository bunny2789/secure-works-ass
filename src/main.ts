import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { APOLLO_PROVIDERS } from './app/apollo.config'; // Import the providers
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { githubReducer } from './app/state/github.reducer';
import { GitHubEffects } from './app/state/github.effects';


const routes: Routes = [

];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideStore({ github: githubReducer }),
    provideEffects([GitHubEffects]),
    ...APOLLO_PROVIDERS, 
  ],
});
