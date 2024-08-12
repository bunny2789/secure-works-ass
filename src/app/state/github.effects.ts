import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { GitHubService } from '../github.service'; // Adjust the path if needed
import { loadRepositories, loadRepositoriesSuccess, loadRepositoriesFailure } from './github.actions';

@Injectable()
export class GitHubEffects {
  constructor(
    private actions$: Actions,
    private githubService: GitHubService
  ) {}

  loadRepositories$ = createEffect(() => this.actions$.pipe(
    ofType(loadRepositories),
    switchMap(action => this.githubService.getRepositories(action.username).pipe(
      map(repositories => loadRepositoriesSuccess({ repositories })),
      catchError(error => of(loadRepositoriesFailure({ error: error.message })))
    ))
  ));
}
