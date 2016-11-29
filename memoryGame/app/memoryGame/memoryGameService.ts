import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { IGameData } from './IgameData';

@Injectable()
export class MemoryGameService {
    private _memoryGameUrl = 'api/memoryGame/words.json';

    constructor(private _http: Http) { }

    getData(): Observable<IGameData[]> {
        return this._http.get(this._memoryGameUrl)
            .map((response: Response) => <IGameData[]> response.json().data)
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
