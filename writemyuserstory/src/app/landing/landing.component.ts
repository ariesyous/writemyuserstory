import { Component, OnInit } from '@angular/core';
import { mergeMap, tap } from 'rxjs';
import { OpenAIService } from '../open-ai.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  textareaValue = '';
  showSpinner = false;
  generatedUserStory = ''
  askForFeedback = false;

  constructor(private openAIService: OpenAIService) { }

  ngOnInit(): void {
  }

  textareaValueChange(e: any) {
    try {
      this.textareaValue = e.target.value;
    } catch (e) {
      alert('Error - could not set textarea-value');
      console.info('could not set textarea-value');
    }
  }



  getCompletion() {
    this.showSpinner = true;
    this.resetFeedback(false);

    this.openAIService.applyContentFilter(this.textareaValue).pipe(mergeMap((filterLabel: any) => {

      if (filterLabel === "2") {

        console.log('not allowed');
        this.showSpinner = false;
        this.askForFeedback = false;
        this.generatedUserStory = '';
        return filterLabel;

      } else {

        return this.openAIService.createCompletion(this.textareaValue).pipe(
          tap((res: string) => {
            this.showSpinner = false;
            this.generatedUserStory = res.trim();
            this.askForFeedback = true;
          })
        );
      }

    })).subscribe();



  }

  resetFeedback(feedbackFlag: boolean) {
    this.askForFeedback = feedbackFlag;
  }
}
