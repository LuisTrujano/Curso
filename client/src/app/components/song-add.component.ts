import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { SongService } from '../services/song.service';
import { Song } from '../models/song';
import { response } from 'express';


@Component({
	selector: 'song-add',
	templateUrl: '../views/song-add.html',
	providers:[UserService, SongService]
})

export class SongAddComponent implements OnInit{
	public titulo: string;
	public song!: Song;
	public identity;
	public token;
	public url: string;
	public alertMessage: any;
    public is_edit;
 

constructor(
 	private _route: ActivatedRoute,
	private _router: Router,
	private _userService:UserService,
    private _songService:SongService
){
	this.titulo = 'Crear nueva cancion';
	this.identity = this._userService.getIdentity();
	this.token = this._userService.getToken();
	this.url = GLOBAL.url;
    this.song = new Song(1,'','','','');
    this.is_edit=false;
	
	
}

ngOnInit(){
	console.log('song-add.component.ts cargado');


}

onSubmit(){
    this._route.params.forEach((params: Params) => {
        let album_id = params['album'];
        this.song.album = album_id;
    
        this._songService.addSong(this.token, this.song).subscribe(
            response =>{
                if (!response.song) {
                    this.alertMessage ='Error en el servidor';
                } else {
                    this.alertMessage ='La cancion se ha creado correctamente!';
                    this.song = response.song;
          this._router.navigate(['/editar-tema', response.song._id]);
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
fileChangeEvent(event: any){
    this.filesToUpload = <Array<File>>event.target.files;
}
	}
    