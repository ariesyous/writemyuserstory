import { Component, OnInit } from '@angular/core';
import { FeedbackService } from './feedback.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
  }

  onFeedbackClick(event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    console.log(target.id)
    this.feedbackService.submitFeedback({ rating: target.id });
  }
}
