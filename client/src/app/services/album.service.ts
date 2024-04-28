import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ArtistService } from '../services/artist.service';
import { GLOBAL } from './global';
import { Album } from '../models/album';
import { Artist } from '../models/artist';

@Injectable()
export class AlbumService{
    public url: string;
    
    constructor(private _http: HttpClient){
this.url = GLOBAL.url;
    }

    getAlbums(token: any, artistId = null){
        let headers= new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });

        if (artistId == null) {
            return this._http.get(this.url+'albums', { headers })
        .pipe(map((res: any) => {
            try {
                return JSON.parse(JSON.stringify(res));
            } catch (error) {
                console.error(error);
                return null;
            }
        }));
        } else {
            return this._http.get(this.url+'albums/'+artistId, { headers })
        .pipe(map((res: any) => {
            try {
                return JSON.parse(JSON.stringify(res));
            } catch (error) {
                console.error(error);
                return null;
            }
        }));
        }
        
    }

    getAlbum(token: any, id:string){
        let headers= new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });
        return this._http.get(this.url+'album/'+id, { headers })
        .pipe(map((res: any) => {
            try {
                return JSON.parse(JSON.stringify(res));
            } catch (error) {
                console.error(error);
                return null;
            }
        }));
    }

    addAlbum(token: any, album: Album){
        let params = JSON.stringify(album);
        let headers= new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });

        return this._http.post(this.url+'album', params, {headers: headers})
        .pipe(map((res: any) => {
            try {
                return JSON.parse(JSON.stringify(res));
            } catch (error) {
                console.error(error);
                return null;
            }
        }));
    }

    editAlbum(token: any, id: string, album: Album){
        let params = JSON.stringify(album);
        let headers= new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });

        return this._http.put(this.url+'album/'+id, params, {headers: headers})
        .pipe(map((res: any) => {
            try {
                return JSON.parse(JSON.stringify(res));
            } catch (error) {
                console.error(error);
                return null;
            }
        }));
    }

    deleteAlbum(token: any, id:string){
        let headers= new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });
        return this._http.delete(this.url+'album/'+id, { headers })
        .pipe(map((res: any) => {
            try {
                return JSON.parse(JSON.stringify(res));
            } catch (error) {
                console.error(error);
                return null;
            }
        }));
    }
}