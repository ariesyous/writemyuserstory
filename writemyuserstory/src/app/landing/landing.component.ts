import { Component, OnInit } from '@angular/core';
import { OpenAIService } from '../open-ai.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  private textareaValue = '';
  generatedUserStory = ''

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
    console.log('user input is', this.textareaValue)
    this.openAIService.createCompletion(this.textareaValue).subscribe((res) => {
      console.log('res from completion is', res.choices[0].text)
      this.generatedUserStory = res.choices[0].text.trim();
    })
  }
}
