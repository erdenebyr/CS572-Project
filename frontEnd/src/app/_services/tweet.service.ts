import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { User, Tweet, FollowReq} from '../_models/';
import { TimelineTweet } from "../_models/timelineTweet";
import { dirname } from 'path';
// import { config } from 'rxjs';
// import { config } from 'process';
// import { config } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class TweetService {
    constructor(private http: HttpClient) { }

    getTimeline() {
        return this.http.get<TimelineTweet>(environment.baseURL + '/home');
    }
    getMyTweets(username: String) {
        return this.http.get<TimelineTweet>(environment.baseURL + '/' + username);
    }

    // register(user: User) {
    //     return this.http.post(environment.baseURL + `/signup`, user);
    // }

    // delete(id: number) {
    //     return this.http.delete(environment.baseURL + `/users/${id}`);
    // }

    // postTweet(tweet: Tweet){
    //     return this.http.post(environment.baseURL + `/action`,tweet)
    // }

    // getSearchResult(username: String){
    //     return this.http.get<User>(environment.baseURL + `/search/${username}`);     
    // }

    // followUser(data: FollowReq){
    //     return this.http.post(environment.baseURL + `/action`, data);
    // }

    // getPersonalInfo(username: String){
    //     return this.http.get(environment.baseURL + `/` + username);
    // }
}