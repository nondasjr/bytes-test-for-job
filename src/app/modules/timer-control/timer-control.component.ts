import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer-control',
  templateUrl: './timer-control.component.html',
  styleUrls: ['./timer-control.component.css']
})
export class TimerControlComponent implements OnInit {

  ticks = 0;
  ticks_controll = 0;
  paused = false;


  _hours: number = this.pad(0);
  _minutes: number = this.pad(0);
  _seconds: number = this.pad(0);

  sub: Subscription;

  ngOnInit() {
  }
  private getSeconds(ticks: number) {
    return this.pad(ticks % 60);
  }

  private getMinutes(ticks: number) {
      return this.pad((Math.floor(ticks / 60)) % 60);
  }

  private getHours(ticks: number) {
      return this.pad(Math.floor((ticks / 60) / 60));
  }

  private pad(digit: any) {
      return digit <= 9 ? '0' + digit : digit;
  }
 
  start() {
    if (!this.sub || this.sub.closed) {
       this.sub = this.getObservable();
    }
  }

  pause() {
    this.sub.unsubscribe();
    this.ticks_controll  =  this.ticks_controll === 0 ?
                               this.ticks :
                               this.ticks_controll + this.ticks;
  }

  resume() {
    this.sub = this.getObservable(this.ticks_controll);
  }

  getObservable(ticks_controll = 0) {
    return Observable.timer(1, 1000).subscribe(
        t => {
            this.ticks = ticks_controll + t;
            this._seconds = this.getSeconds(this.ticks);
            this._minutes = this.getMinutes(this.ticks);
            this._hours = this.getHours(this.ticks);
        }
    );
  }
  stop() {
    this.sub.unsubscribe();
    this.sub = undefined;
    this.ticks = 0;
    this.ticks_controll = 0;
    this._seconds = this.pad(0);
    this._minutes = this.pad(0);
    this._hours = this.pad(0);
  }

}
