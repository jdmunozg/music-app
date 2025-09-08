import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../playlist.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listas: any[] = [];

  constructor(private playlistService: PlaylistService) {}

  ngOnInit() {
    this.cargarListas();
  }

  cargarListas() {
    this.playlistService.getPlaylists().subscribe(res => this.listas = res);
  }

  eliminarLista(nombre: string) {
    if(confirm('¿Desea eliminar esta lista?')) {
      this.playlistService.deletePlaylist(nombre).subscribe({
        next: () => this.cargarListas(),
        error: () => alert('Error al eliminar la lista')
      });
    }
  }
}
