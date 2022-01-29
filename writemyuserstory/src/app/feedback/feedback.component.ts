import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FeedbackService } from './feedback.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  @Input() prompt = '';
  @Input() completion = '';
  @Output() showFeedback = new EventEmitter<boolean>();

  @ViewChild('feedbackInput')
  feedbackInputRef: ElementRef | any;

  selectedEmoji: string = '';
  private textareaValue = '';

  showThankYou: boolean = false;

  constructor(private feedbackService: FeedbackService) { }

  onEmojiClick(event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    this.selectedEmoji = target.id;
    const checkExist = setInterval(() => {
      if (this.feedbackInputRef) {
        this.feedbackInputRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
        clearInterval(checkExist);
      }
    }, 100)
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
    this.feedbackService.submitFeedback({ rating: this.selectedEmoji, feedbackText: this.textareaValue, prompt: this.prompt, completion: this.completion });
    this.showThankYou = true;
  }

  dismissFeedback() {
    this.showFeedback.emit(false);
    this.selectedEmoji = ''
    this.textareaValue = ''
    this.showThankYou = false;

  }
}
