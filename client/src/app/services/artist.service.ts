import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Artist } from '../models/artist';

@Injectable()
export class ArtistService{
    public url: string;
    
    constructor(private _http: HttpClient){
this.url = GLOBAL.url;
    }

    addArtist(token: any, artist: Artist){
        let params = JSON.stringify(artist);
        let headers= new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });

        return this._http.post(this.url+'artist', params, {headers: headers})
        .pipe(map((res: any) => {
            try {
                return JSON.parse(JSON.stringify(res));
            } catch (error) {
                console.error(error);
                return null;
            }
        }));
    }


    getArtists(token: any, page: string){
        
        let headers= new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });
        //let options = new HttpParams({ headers: headers}); 
        //return this._http.get(this.url+'artists/'+page, options)
        return this._http.get(this.url+'artists/'+page, { headers })
        .pipe(map((res: any) => {
            try {
                return JSON.parse(JSON.stringify(res));
            } catch (error) {
                console.error(error);
                return null;
            }
        }));
    }

    getArtist(token: any, id: string){
        
        let headers= new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });
        return this._http.get(this.url+'artist/'+id, { headers })
        .pipe(map((res: any) => {
            try {
                return JSON.parse(JSON.stringify(res));
            } catch (error) {
                console.error(error);
                return null;
            }
        }));
    }


    editArtist(token: any, id: string, artist: Artist){
        let params = JSON.stringify(artist);
        let headers= new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });

        return this._http.put(this.url+'artist/'+id, params, {headers: headers})
        .pipe(map((res: any) => {
            try {
                return JSON.parse(JSON.stringify(res));
            } catch (error) {
                console.error(error);
                return null;
            }
        }));
    }

    deleteArtist(token: any, id: string){
        
        let headers= new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });
        //let options = new HttpParams({ headers: headers}); 
        //return this._http.get(this.url+'artists/'+page, options)
        return this._http.delete(this.url +'artist/'+id, { headers })
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