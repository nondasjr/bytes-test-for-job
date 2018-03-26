import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-timer-control',
  templateUrl: './timer-control.component.html',
  styleUrls: ['./timer-control.component.css']
})
export class TimerControlComponent implements OnInit {

  ticks = 0;
  ticks_controll = 0;
  paused = false;


  _milliseconds: number = this.padMilliseconds(0);
  _seconds: number = this.pad(0);
  _minutes: number = this.pad(0);

  sub: Subscription;

  ngOnInit() {
  }
  private getMilliseconds(ticks: number) {
    return this.padMilliseconds(Math.floor(ticks % 1000));
  }

  private getSeconds(ticks: number) {
    return this.pad(Math.floor((ticks / 1000) % 60));
  }

  private getMinutes(ticks: number) {
    return this.pad(Math.floor((ticks / 60000) % 60));
  }

  private pad(digit: any) {
      return digit <= 9 ? '0' + digit : digit;
  }

  private padMilliseconds(digit: any) {
      return digit <= 9 ? '00' + digit : digit <= 99 ? '0' + digit : digit;
  }

  start() {
    if (!this.sub || this.sub.closed) {
       this.sub = this.getObservable();
    }
  }

  pause() {
    console.log(this.ticks);
    this.sub.unsubscribe();
    this.ticks_controll  =  this.ticks;
  }

  resume() {
    this.sub = this.getObservable(this.ticks_controll);
  }

  getObservable(ticks_controll = 0) {
    return Observable.timer(1, 1).subscribe(
        t => {
            this.ticks = ticks_controll + (t * 4.3) ;
            this._milliseconds = this.getMilliseconds(this.ticks);
            this._seconds = this.getSeconds(this.ticks);
            this._minutes = this.getMinutes(this.ticks);
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
    this._milliseconds = this.padMilliseconds(0);
  }

}
