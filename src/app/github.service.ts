// src/app/github.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Repository } from './models/repository.model'; // Ensure this path is correct

@Injectable({
  providedIn: 'root'
})
export class GitHubService {
  private apiUrl = 'https://api.github.com/graphql'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getRepositories(username: string): Observable<any> {
    const query = `
      query {
        user(login: "${username}") {
          repositories(first: 10) {
            nodes {
              name
              description
              stargazerCount
            }
          }
        }
      }
    `;
    return this.http.post<any>(this.apiUrl, { query });
  }
}
