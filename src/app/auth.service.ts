import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  token$ = this.tokenSubject.asObservable();
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<{token: string}>(`${this.baseUrl}/login`, { username, password })
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);   // Guardar en localStorage
          this.tokenSubject.next(res.token);          // Actualizar BehaviorSubject
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token');           // Leer desde localStorage
  }

  logout(): void {
    localStorage.removeItem('token');              // Eliminar token al cerrar sesión
    this.tokenSubject.next(null);
  }
}
