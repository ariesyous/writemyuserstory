import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private firestore: AngularFirestore) { }

  submitFeedback(feedbackData: Object) {
    const created = new Date().toISOString();
    feedbackData = { ...feedbackData, created }

    this.firestore.collection('feedback').add(feedbackData).catch((error) => {
      alert(`Oops, something went wrong. ${error}`);
    }
    )

  }
}
