import { createReducer, on } from '@ngrx/store';
import { Repository } from '../models/repository.model';
import { loadRepositoriesSuccess, filterRepositories } from './github.actions';

export interface GitHubState {
  repositories: Repository[];
  filteredRepositories: Repository[];
  loading: boolean;
  error: string | null;
}

const initialState: GitHubState = {
  repositories: [],
  filteredRepositories: [],
  loading: false,
  error: null,
};

export const githubReducer = createReducer(
  initialState,
  on(loadRepositoriesSuccess, (state, { repositories }) => ({
    ...state,
    repositories,
    filteredRepositories: repositories,
    loading: false,
    error: null
  })),
  on(filterRepositories, (state, { searchTerm }) => ({
    ...state,
    filteredRepositories: state.repositories.filter(repo =>
      repo.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }))
);
