import { Component, VERSION } from '@angular/core';
import { interval, map, Subscription } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  private $timer: Subscription;
  number: number = 10;
  interval = interval(1000).pipe(
    map((value) => {
      return 9 - value;
    })
  );
  private disactivate() {
    this.$timer.unsubscribe();
  }

  count() {
    this.number = 10;
    if (this.$timer) {
      this.disactivate();
    }

    this.$timer = this.interval.subscribe((t) => {
      this.number = t;
      if (t == 0) {
        this.disactivate();
      }
    });
  }
}
