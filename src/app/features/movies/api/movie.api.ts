import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieResponse, Genre} from '../types/movie.type';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MovieDetails } from '../types/movie.type';
import { PersonSearchResponse, PersonFilmographyResponse } from 'src/app/features/generator/types/generator.type';

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

  searchPerson(query: string): Observable<PersonSearchResponse> {
    const url = `${this.apiUrl}/search/person?api_key=${this.apiKey}&query=${query}`;
    return this.http.get<PersonSearchResponse>(url);
  }

  getPersonFilmography(personId: number): Observable<PersonFilmographyResponse> {
    const url = `${this.apiUrl}/person/${personId}/movie_credits?api_key=${this.apiKey}`;
    return this.http.get<PersonFilmographyResponse>(url);
  }

  getGenres(): Observable<GenreResponse> {
    return this.http.get<GenreResponse>(`${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}`);
  }

  getTopRatedMovies(page = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.apiUrl}/movie/top_rated?api_key=${this.apiKey}&page=${page}`);
  }

  getMovieDetails(movieId: number): Observable<MovieDetails> {
    const url = `${this.apiUrl}/movie/${movieId}?api_key=${this.apiKey}&append_to_response=credits`;
    return this.http.get<MovieDetails>(url);
  }

  getUpcomingMovies(page = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.apiUrl}/movie/upcoming?api_key=${this.apiKey}&page=${page}`);
  }

  searchMovies(query: string, page = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${query}&page=${page}`);
  }
}
