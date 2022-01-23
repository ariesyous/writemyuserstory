import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FeedbackService } from './feedback.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  @ViewChild('feedbackInput')
  feedbackInputRef: ElementRef | any;

  selectedEmoji: string = '';
  private textareaValue = '';

  isDismissed: boolean = false;
  showThankYou: boolean = false;

  constructor(private feedbackService: FeedbackService) { }

  onEmojiClick(event: Event) {
    console.log('el is', this.feedbackInputRef);
    const target = event.currentTarget as HTMLInputElement;
    this.selectedEmoji = target.id;
    const checkExist = setInterval(() => {
      if (this.feedbackInputRef) {
        console.log("Exists!");
        this.feedbackInputRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
        clearInterval(checkExist);
      }
    }, 100)
    console.log('selected emoji is', this.selectedEmoji)



  }

  textareaValueChange(e: any) {
    try {
      this.textareaValue = e.target.value;
    } catch (e) {
      alert('Error - could not set textarea-value');
      console.info('could not set textarea-value');
    }
  }

  onFeedbackSubmit() {
    this.feedbackService.submitFeedback({ rating: this.selectedEmoji, feedbackText: this.textareaValue });

    this.selectedEmoji = ''
    this.textareaValue = ''
    this.isDismissed = false;
    this.showThankYou = true;
  }

  dismissFeedback() {
    // this.isDismissed = true;
    this.selectedEmoji = ''
    this.textareaValue = ''
    this.showThankYou = false;

  }
}
