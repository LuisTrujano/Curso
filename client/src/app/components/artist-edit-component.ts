import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { UploadService } from '../services/upload.service';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist';
import { response } from 'express';


@Component({
	selector: 'artist-edit',
	templateUrl: '../views/artist-add.html',
	providers:[UserService, ArtistService, UploadService]
})

export class ArtistEditComponent implements OnInit{
	public titulo: string;
	public artist: Artist;
	public identity;
	public token;
	public url: string;
	public alertMessage: any;
	public is_edit;
	

constructor(
 	private _route: ActivatedRoute,
	private _router: Router,
	private _userService:UserService,
	private _uploadService: UploadService,
	private _artistService: ArtistService
){
	this.titulo = 'Editar artista';
	this.identity = this._userService.getIdentity();
	this.token = this._userService.getToken();
	this.url = GLOBAL.url;
    this.artist = new Artist('','','');
	this.is_edit = true;
	
	
}

ngOnInit(){
	console.log('artist-edit.component.ts cargado');
	
	// Llamar al metodo del api para sacar un artista en base a su id getArtist
	this.getArtist();

}

getArtist(){
	this._route.params.forEach((params: Params) => {
		let id = params['id'];
	
		this._artistService.getArtist(this.token, id).subscribe(
		response => {
		if(!response.artist){
		this._router.navigate(['/']);
	
	}else{
		this.artist = response.artist;
	}
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
	});
	}
	

onSubmit(){
 console.log(this.artist);
 this._route.params.forEach((params: Params) => {
	let id = params['id'];
 this._artistService.editArtist(this.token, id, this.artist).subscribe(
response =>{

	if (!response.artist) {
		this.alertMessage ='Error en el servidor';
	} else {
		this.alertMessage ='El artista se ha actualizado correctamente !';
		if (!this.filesToUpload) {
			this._router.navigate(['/artista', response.artist._id]);
		} else {
			
		//subir la imagen del artista
		this._uploadService.makeFileRequest(this.url+'upload-image-artist/'+id, [], this.filesToUpload, this.token, 'image')
		.then(
			(result)=>{
				this._router.navigate(['/artista', response.artist._id]);
			},
			(error) =>{
				console.log(error);
			}
			);
		}
		//this.artist = response.artist;
		//this._router.navigate(['/editar-artista'], response.artist._id);
	}
},
error =>{
	var errorMessage = <any>error;
	
	if (errorMessage != null) {
	  var body = (typeof error.error === 'string') ? JSON.parse(error.error) : error.error;
	  this.alertMessage = ` : ${body.message}`;
	console.log(error);
	}
  }
 );
});
}
	public filesToUpload: Array<File> = [];
	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

}