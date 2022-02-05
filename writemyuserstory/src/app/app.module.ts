import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BuymeacoffeeComponent } from './buymeacoffee/buymeacoffee.component';
import { BannerComponent } from './shared/banner/banner.component';



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    FeedbackComponent,
    BuymeacoffeeComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
