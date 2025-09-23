import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieResponse, Genre} from '../types/movie.type';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface GenreResponse {
  genres: Genre[];
}

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  private http = inject(HttpClient);
  private readonly apiKey = environment.apiKey;
  private readonly apiUrl = 'https://api.themoviedb.org/3';

  getPopularMovies(page = 1): Observable<MovieResponse> {
    console.log(this.apiKey)
    return this.http.get<MovieResponse>(`${this.apiUrl}/movie/popular?api_key=${this.apiKey}&page=${page}`);
  }

  getGenres(): Observable<GenreResponse> {
    return this.http.get<GenreResponse>(`${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}`);
  }

  getTopRatedMovies(page = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.apiUrl}/movie/top_rated?api_key=${this.apiKey}&page=${page}`);
  }

  getUpcomingMovies(page = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.apiUrl}/movie/upcoming?api_key=${this.apiKey}&page=${page}`);
  }

  searchMovies(query: string, page = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${query}&page=${page}`);
  }
}
