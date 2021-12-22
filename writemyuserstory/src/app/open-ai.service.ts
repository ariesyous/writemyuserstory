import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

const engine_id = 'davinci-instruct-beta-v3'
const url = `https://api.openai.com/v1/engines/${engine_id}/completions`
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer `
  })
};
const promptObj = {
  "prompt": "This is a user story generator. It accepts a prompt and outputs a user story based on the prompt. \n\nUser stories are short, simple descriptions of a feature told from the perspective of the person who desires the new capability, usually a user or customer of the system. They articulate the goal that the user or customer is trying to accomplish. They typically follow a simple template:\nAs a < type of user >, I want < some goal > so that < some reason >.\n\nWrite a user story for the following text:\nWant to know which accounts from my territory to prioritise for sales\n\nUser Story:",
  "temperature": 0.53,
  "max_tokens": 64,
  "top_p": 1,
  "frequency_penalty": 0.38,
  "presence_penalty": 0.39
}

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {

  constructor(private http: HttpClient) { }

  handleError(error: any): any {
    console.error('Something has gone wrong', error)
    // do something with the exception
  }

  createCompletion(prompt: string): Observable<any> {
    return this.http.post(url, promptObj, httpOptions).pipe(
      catchError(error => this.handleError(error))
    );
  }

}
