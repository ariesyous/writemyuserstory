import { Component, OnInit } from '@angular/core';
import { OpenAIService } from '../open-ai.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  generatedUserStory = ''

  constructor(private openAIService: OpenAIService) { }

  ngOnInit(): void {
  }

  getCompletion() {
    this.openAIService.createCompletion('blah').subscribe((res) => {
      console.log('res from completion is', res.choices[0].text)
      this.generatedUserStory = res.choices[0].text;
    })
  }
}
