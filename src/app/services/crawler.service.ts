import { Injectable } from "@angular/core";
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import {LastSeenInfo} from "../types/last.seen.info";

@Injectable({
  providedIn: 'root'
})
export class CrawlerService {

  async crawlLocation(): Promise<LastSeenInfo> {
    const options = {
      url: 'https://www.goon-tracker.com/pvetracker',
    };

    const response: HttpResponse = await CapacitorHttp.get(options);
    const html = response.data as string;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const map = this.findMap(doc);
    const time = this.findTime(doc);
    const lastSeen = this.findLastSeen(doc);

    return {
      map: map,
      time: time,
      lastSeen: lastSeen
    };
  }

  private findMap(doc: Document) {
    const lastSeenDiv = doc.querySelector('.last-seen');
    const highlightSpan = lastSeenDiv?.querySelector('span.highlight');

    return highlightSpan?.textContent?.trim() || 'Unknown';
  }

  private findTime(doc: Document): string {
    const lastSeenDiv = doc.querySelector('.last-seen');
    // Find the <p> that starts with "Time:"
    const timeP = Array.from(lastSeenDiv?.querySelectorAll('p') || []).find(p =>
      p.textContent?.trim().startsWith('Time:')
    );
    // Get the <span> inside that <p>
    const timeSpan = timeP?.querySelector('span');

    return timeSpan?.textContent?.trim() || 'Unknown';
  }

  private findLastSeen(doc: Document): string {
    const lastSeenDiv = doc.querySelector('.last-seen');
    // Find the <p> that starts with "Last seen:"
    const lastSeenP = Array.from(lastSeenDiv?.querySelectorAll('p') || []).find(p =>
      p.textContent?.trim().startsWith('Last seen:')
    );
    // Get the <span> inside that <p>
    const lastSeenSpan = lastSeenP?.querySelector('span');

    return lastSeenSpan?.textContent?.trim() || 'Unknown';
  }
}
