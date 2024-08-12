import { Component } from '@angular/core';
import { BarChartComponent } from './bar-chart/bar-chart.component'; 
import { RepoGridComponent } from './repo-grid/repo-grid.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { Repository } from './models/repository.model';
import { GitHubService } from './github.service';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { createApollo } from './apollo.config';
import { loadRepositories, filterRepositories } from './state/github.actions';
import { GitHubState } from './state/github.reducer';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { TransformPipe } from './pipes/transform.pipe';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ApolloModule,
    AgGridModule,
    RepoGridComponent,
    BarChartComponent,
    TransformPipe,
  ],
  providers: [
    GitHubService, // Ensure GitHubService is added here
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [],
    },
  ],
})
export class AppComponent {
  title: string = '';
  username = '';
  repositories$: Observable<Repository[]>;
  searchTerm = '';
  repositories: Repository[] = [];

  constructor(private store: Store<{ github: GitHubState }>) {
    this.repositories$ = this.store.select(state => state.github.filteredRepositories).pipe(
      map(repositories => repositories ?? [])
    );
  }

  fetchData(): void {
    if (this.username) {
      this.store.dispatch(loadRepositories({ username: this.username }));
    }
  }

  onSearchInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value;
    this.username = searchTerm;
    this.store.dispatch(filterRepositories({ searchTerm }));
  }
  
  getChartData(data: Repository[]): { name: string, value: number }[] {
    return data.map(repo => ({
      name: repo.name,
      value: repo.stargazerCount,
    }));
  }
  
}
