import { Component, inject, OnInit } from '@angular/core';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from "ionicons";
import { reload } from 'ionicons/icons';

import { CrawlerService } from "./services/crawler.service";
import {LastSeenInfo} from "./types/last.seen.info";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp, IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon],
})
export class AppComponent implements OnInit {
  private crawlerService = inject(CrawlerService);
  goonsLocation: LastSeenInfo = {
    map: 'Unknown',
    time: 'Unknown',
    lastSeen: 'Unknown'
  };

  constructor() {
    addIcons({ reload });
  }

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.crawlerService.crawlLocation().then((location: LastSeenInfo) => {
      this.goonsLocation = location;
    });
  }
}
