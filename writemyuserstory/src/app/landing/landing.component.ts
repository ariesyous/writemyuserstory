import { Component, OnInit } from '@angular/core';
import { OpenAIService } from '../open-ai.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  private textareaValue = '';
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
      console.info('could not set textarea-value');
    }
  }

  getCompletion() {
    this.showSpinner = true;
    this.openAIService.createCompletion(this.textareaValue).subscribe((res) => {
      this.showSpinner = false;
      this.generatedUserStory = res.trim();
      this.askForFeedback = true;
    })
  }
}
