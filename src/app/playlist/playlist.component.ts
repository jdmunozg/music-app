import { Component } from '@angular/core';
import { PlaylistService } from '../playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent {
  nombre = '';
  descripcion = '';
  message = '';

  // Canciones dinámicas
  canciones: any[] = [];
  nuevaCancion = { titulo: '', artista: '', album: '', anio: '', genero: '' };

  constructor(private playlistService: PlaylistService) {}

  agregarCancion() {
    // Validar que los campos no estén vacíos
    if(this.nuevaCancion.titulo && this.nuevaCancion.artista) {
      this.canciones.push({ ...this.nuevaCancion });
      this.nuevaCancion = { titulo: '', artista: '', album: '', anio: '', genero: '' };
    } else {
      alert('Ingrese al menos título y artista de la canción');
    }
  }

  eliminarCancion(index: number) {
    this.canciones.splice(index, 1);
  }

  crearPlaylist() {
    if(!this.nombre || !this.descripcion || this.canciones.length === 0) {
      alert('Complete todos los campos y agregue al menos una canción');
      return;
    }

    const data = { nombre: this.nombre, descripcion: this.descripcion, cancion: this.canciones };
    this.playlistService.createPlaylist(data).subscribe({
      next: res => {
        this.message = `Lista creada: ${res.nombre}`;
        // Reset
        this.nombre = '';
        this.descripcion = '';
        this.canciones = [];
      },
      error: err => this.message = 'Error al crear la lista'
    });
  }
}
