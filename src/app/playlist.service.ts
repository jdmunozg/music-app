import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private baseUrl = 'http://localhost:8080/api/lista/lists';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders() {
    const token = this.auth.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  createPlaylist(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data, { headers: this.getHeaders() });
  }

  getPlaylists(): Observable<any> {
    return this.http.get(this.baseUrl, { headers: this.getHeaders() });
  }

  deletePlaylist(nombre: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${nombre}`, { headers: this.getHeaders() });
  }
}
