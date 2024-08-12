import { createAction, props } from '@ngrx/store';
import { Repository } from '../models/repository.model';

export const loadRepositories = createAction(
  '[GitHub] Load Repositories',
  props<{ username: string }>()
);

export const loadRepositoriesSuccess = createAction(
  '[GitHub] Load Repositories Success',
  props<{ repositories: Repository[] }>()
);

export const loadRepositoriesFailure = createAction(
  '[GitHub] Load Repositories Failure',
  props<{ error: string }>()
);

export const filterRepositories = createAction(
  '[GitHub] Filter Repositories',
  props<{ searchTerm: string }>()
);
