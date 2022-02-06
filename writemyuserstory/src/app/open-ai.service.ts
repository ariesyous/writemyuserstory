import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  applyContentFilter(userPrompt: string): Observable<any> {
    const url = `${environment.apiUrl}applyContentFilter`
    const promptObj = {
      "prompt": `<|endoftext|>This is a user story generator. It accepts a prompt and outputs a user story based on the prompt. \n\nUser stories are short, simple descriptions of a feature told from the perspective of the person who desires the new capability, usually a user or customer of the system. They articulate the goal that the user or customer is trying to accomplish. They typically follow a simple template:\nAs a < type of user >, I want < some goal > so that < some reason >.\n\nWrite a user story for the following text:\n${userPrompt}\n\nUser Story:\n--\nLabel:`,
      "temperature": 0,
      "max_tokens": 1,
      "top_p": 0,
      "logprobs": 10,
      "user": this.guidGenerator()
    }

    return this.http.post(url, promptObj, httpOptions)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  createCompletion(userPrompt: string): Observable<any> {
    const url = `${environment.apiUrl}createCompletion`

    const promptObj = {
      userPrompt,
      "prompt": `This is a user story generator. It accepts a prompt and outputs a user story based on the prompt. \n\nUser stories are short, simple descriptions of a feature told from the perspective of the person who desires the new capability, usually a user or customer of the system. They articulate the goal that the user or customer is trying to accomplish. They typically follow a simple template:\nAs a < type of user >, I want < some goal > so that < some reason >.\n\nWrite a user story for the following text:\n${userPrompt}\n\nUser Story:`,
      "temperature": 0.7,
      "max_tokens": 64,
      "top_p": 1,
      "frequency_penalty": 1.0,
      "presence_penalty": 1.0,
      "user": this.guidGenerator()
    }

    return this.http.post(url, promptObj, httpOptions)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  guidGenerator() {
    const S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }
}
