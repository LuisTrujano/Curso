import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ArtistService } from '../services/artist.service';
import { GLOBAL } from './global';
import { Song } from '../models/song';
import { Artist } from '../models/artist';

@Injectable()
export class SongService{
    public url: string;
    
    constructor(private _http: HttpClient){
this.url = GLOBAL.url;
    }

    getSongs(token: any, albumId = null){
        let headers= new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });
        if (albumId == null) {
            return this._http.get(this.url+'songs', { headers })
            .pipe(map((res: any) => {
                try {
                    return JSON.parse(JSON.stringify(res));
                } catch (error) {
                    console.error(error);
                    return null;
                }
            }));
        } else {
            return this._http.get(this.url+'songs/'+albumId, { headers })
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

    getSong(token: any, id: string){
        let headers= new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });
        return this._http.get(this.url+'song/'+id, { headers })
        .pipe(map((res: any) => {
            try {
                return JSON.parse(JSON.stringify(res));
            } catch (error) {
                console.error(error);
                return null;
            }
        }));

    }

    addSong(token: any, song: Song){
        let params = JSON.stringify(song);
        let headers= new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });

        return this._http.post(this.url+'song', params, {headers: headers})
        .pipe(map((res: any) => {
            try {
                return JSON.parse(JSON.stringify(res));
            } catch (error) {
                console.error(error);
                return null;
            }
        }));
    }

    editSong(token: any, id: string, song: Song){
        let params = JSON.stringify(song);
        let headers= new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });

        return this._http.put(this.url+'song/'+id, params, {headers: headers})
        .pipe(map((res: any) => {
            try {
                return JSON.parse(JSON.stringify(res));
            } catch (error) {
                console.error(error);
                return null;
            }
        }));
    }
    deleteSong(token: any, id: string){
        let headers= new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });
        return this._http.delete(this.url+'song/'+id, { headers })
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