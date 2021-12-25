import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

const url = 'https://europe-west2-write-my-user-story.cloudfunctions.net/createCompletion'
// const url = 'http://localhost:5001/write-my-user-story/europe-west2/createCompletion' // for local testing

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {

  constructor(private http: HttpClient) { }

  handleError(error: any): any {
    console.error('Something has gone wrong', error)
    // do something with the exception
  }

  createCompletion(userPrompt: string): Observable<any> {
    const promptObj = {
      userPrompt,
      "prompt": `This is a user story generator. It accepts a prompt and outputs a user story based on the prompt. \n\nUser stories are short, simple descriptions of a feature told from the perspective of the person who desires the new capability, usually a user or customer of the system. They articulate the goal that the user or customer is trying to accomplish. They typically follow a simple template:\nAs a < type of user >, I want < some goal > so that < some reason >.\n\nWrite a user story for the following text:\n${userPrompt}\n\nUser Story:`,
      "temperature": 0.7,
      "max_tokens": 64,
      "top_p": 1,
      "frequency_penalty": 1.0,
      "presence_penalty": 1.0
    }

    return this.http.post(url, promptObj, httpOptions).pipe(
      catchError(error => this.handleError(error))
    );
  }

}
