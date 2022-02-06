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
  showError = false;
  errorMessage = '';
  errorDescription = '';

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
        this.showSpinner = false;
        this.askForFeedback = false;
        this.generatedUserStory = '';
        this.showError = true;
        this.errorMessage = "This text has been classified as unsafe. Please try another prompt."
        this.errorDescription = "This means that the text contains profane language, prejudiced or hateful language, something that could be NSFW, or text that portrays certain groups/people in a harmful manner."

        return filterLabel;

      } else {
        this.resetError();

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

  resetError() {
    this.showError = false;
    this.errorMessage = '';
    this.errorDescription = '';
  }
}
