import {Hero} from "./hero";
import {Injectable} from "@angular/core";
import { Headers, Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {
    private heroesUrl = 'app/heroes';  //URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http){}

    getHeroes(): Promise<Hero[]> {
        //return Promise.resolve(HEROES);
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response=>response.json().data as Hero[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any>{
        console.error('An error occurred', error);
        return Promise.reject(error.message | error);
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise<Hero[]>(resolve =>
            setTimeout(resolve, 2000)) // delay 2 seconds
            .then(() => this.getHeroes());
    }

    getHero(id: number): Promise<Hero> {
        return this.getHeroes()
            .then(heroes => heroes.find(hero => hero.id === id));
    }

    update(hero: Hero): Promise<Hero> {
        const url = '${this.heroesUrl}/${hero.id}'
        return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(()=>hero)
            .catch(this.handleError);
    }

    create(name: string): Promise<Hero> {
        return this.http
            .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise
            .then()
    }
}