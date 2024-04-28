import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist';
import { response } from 'express';


@Component({
	selector: 'artist-list',
	templateUrl: '../views/artist-list.html',
	providers:[UserService, ArtistService]
})

export class ArtistListComponent implements OnInit{
	public titulo: string;
	public artists!: Artist[];
	public identity;
	public token;
	public url: string;
	public next_page;
	public prev_page;

constructor(
 	private _route: ActivatedRoute,
	private _router: Router,
	private _artistService: ArtistService,
	private _userService: UserService

){
	this.titulo = 'Artistas';
	this.identity = this._userService.getIdentity();
	this.token = this._userService.getToken();
	this.url = GLOBAL.url;
	this.next_page = 1;
	this.prev_page = 1;
	
}

ngOnInit(){
	console.log('artist-list.component.ts cargado');
	
	// conseguir el listado de artistas
	this.getArtists();
}
getArtists(){
	this._route.params.forEach((params: Params) => {
let page = +params['page'];
if (!page) {
	page = 1;
} else {
	this.next_page = page+1;
	this.prev_page = page-1;

	if(this.prev_page == 0){

		this.prev_page = 1;
		}
}
this._artistService.getArtists(this.token, page.toString()).subscribe(
	response => {
		if(!response.artists){
		this._router.navigate(['/']);
	
	}else{
		this.artists = response.artists;
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

public confirmado: any;
onDeleteConfirm(id: any){
this.confirmado = id;
}

onCancelArtist(){
	this.confirmado = null;
}

onDeleteArtist(id: any){
this._artistService.deleteArtist(this.token, id).subscribe(
	response => {
		if(!response.artist){
		alert('Error en el servidor');
	
	}
		this.getArtists();
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
}