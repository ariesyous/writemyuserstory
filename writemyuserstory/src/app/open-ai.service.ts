import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const engine_id = 'davinci-instruct-beta-v3'
const url = `https://api.openai.com/v1/engines/${engine_id}/completions`
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer $OPENAI_API_KEY`
  })
};

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {

  constructor(private http: HttpClient) { }


  createCompletion(prompt: string) {
    return this.http.post(url, prompt, httpOptions)
  }

}
