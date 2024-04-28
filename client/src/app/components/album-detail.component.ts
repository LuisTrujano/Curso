import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { AlbumService } from '../services/album.service';
import { SongService } from '../services/song.service';
import { Album } from '../models/album';
import { Artist } from '../models/artist';
import { Song } from '../models/song';
import { response } from 'express';


@Component({
	selector: 'album-detail',
	templateUrl: '../views/album-detail.html',
	providers:[UserService, AlbumService, SongService]
})

export class AlbumDetailComponent implements OnInit{
	public album!: Album;
	public identity;
	public token;
	public url: string;
	public alertMessage: any;
	public songs!: Song[];


constructor(
 	private _route: ActivatedRoute,
	private _router: Router,
	private _userService:UserService,
	private _albumService: AlbumService,
	private _songService: SongService
){
	this.identity = this._userService.getIdentity();
	this.token = this._userService.getToken();
	this.url = GLOBAL.url;


}

ngOnInit(){
	console.log('album-detail.component.ts cargado');
	
	// Sacar album de la bbdd
	this.getAlbum();

}

getAlbum(){  
	this._route.params.forEach((params: Params) => {
		let id = params['id'];
	
		this._albumService.getAlbum(this.token, id).subscribe(
		response => {
		if(!response.album){
		this._router.navigate(['/']);
	
	}else{
		this.album = response.album;
				
        //sacar las canciones
		this._songService.getSongs(this.token, response.album._id).subscribe(
				response =>{
				if (!response.songs) {
					this.alertMessage = 'Este album no tiene canciones';
				} else {
					this.songs = response.songs;
				}
				  });
				}
			},
			error =>{
				var errorMessage = <any>error;
				
				if (errorMessage != null) {
				  var body = (typeof error.error === 'string') ? JSON.parse(error.error) : error.error;
				  //this.alertMessage = ` : ${body.message}`;
				console.log(error);
				}
			  });
}
			  );
		}
		public confirmado: any;
		onDeleteConfirm(id: any){
			this.confirmado = id;
		}

		onCancelSong(){
			this.confirmado = null;
		}

		onDeleteSong(id: any){
			this._songService.deleteSong(this.token, id).subscribe(
				response =>{
					if (!response.song) {
				alert('Error en el servidor');
					} 
					this.getAlbum();
				},

					error =>{
						var errorMessage = <any>error;
						
						if (errorMessage != null) {
						  var body = (typeof error.error === 'string') ? JSON.parse(error.error) : error.error;
						  //this.alertMessage = ` : ${body.message}`;
						console.log(error);
						}
					  }
				  );
		}
		startPlayer(song: any) {
			let song_player = JSON.stringify(song);
			let file_path = this.url + 'get-song-file/' + song.file;
			let image_path = this.url + 'get-image-album/' + song.album.image;
		  
			localStorage.setItem('sound-song', song_player);
			
			let mp3Source = document.getElementById("mp3-source");
			if (mp3Source) {
			  mp3Source.setAttribute("src", file_path);
			} else {
			  console.error("No se encontró el elemento con id 'mp3-source'");
			}
			
			(document.getElementById("player") as any).load();
			(document.getElementById("player") as any).play();
		  
			let songTitleElement = document.getElementById('play-song-title');
			if (songTitleElement) {
			  songTitleElement.innerHTML = song.name;
			} else {
			  console.error("No se encontró el elemento con id 'play-song-title'");
			}
			
			let songArtistElement = document.getElementById('play-song-artist');
			if (songArtistElement) {
			  songArtistElement.innerHTML = song.album.artist.name;
			} else {
			  console.error("No se encontró el elemento con id 'play-song-artist'");
			}
			
			let imageAlbumElement = document.getElementById('play-image-album');
			if (imageAlbumElement) {
			  imageAlbumElement.setAttribute('src', image_path);
			} else {
			  console.error("No se encontró el elemento con id 'play-image-album'");
			}
		  }
		  
}

	