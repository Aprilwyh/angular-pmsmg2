import { AfterViewInit, ViewChild } from '@angular/core';
import { Component }                from '@angular/core';
import { CountdownTimerComponent }  from './countdown-timer.component';


//// Local variable, #timer, version
@Component({
  selector: 'app-countdown-parent-lv',
  template: `
  <h3>Countdown to Liftoff (via local variable)</h3>
  <button (click)="timer.start()">Start</button>
  <button (click)="timer.stop()">Stop</button>
  <div class="seconds">{{timer.seconds}}</div>
  <!-- 父组件不能通过数据绑定使用子组件的 start 和 stop 方法，也不能访问子组件的 seconds 属性
  把本地变量(#timer)放到(<countdown-timer>)标签中，用来代表子组件.父组件的模板得到了子组件的引用,可以在父组件的模板中访问子组件的所有属性和方法。 -->
  <app-countdown-timer #timer></app-countdown-timer>
  `,
  styleUrls: ['../assets/demo.css']
})
export class CountdownLocalVarParentComponent { }

//// View Child version
@Component({
  selector: 'app-countdown-parent-vc',
  template: `
  <h3>Countdown to Liftoff (via ViewChild)</h3>
  <button (click)="start()">Start</button>
  <button (click)="stop()">Stop</button>
  <div class="seconds">{{ seconds() }}</div>
  组件元数据里不再需要 #timer 本地变量
  <app-countdown-timer></app-countdown-timer>
  `,
  styleUrls: ['../assets/demo.css']
})
export class CountdownViewChildParentComponent implements AfterViewInit {
  // 父组件想要访问子组件的属性或方法时，把子组件作为ViewChild注入到父组件
  // 父组件：countdown-parent，子组件：countdown-timer
  @ViewChild(CountdownTimerComponent, {static: false})
  private timerComponent: CountdownTimerComponent;

  seconds() { return 0; }

  // 被注入的计时器组件只有在 Angular 显示了父组件视图之后才能访问，所以它先把秒数显示为 0.
  ngAfterViewInit() {
    // Redefine `seconds()` to get from the `CountdownTimerComponent.seconds` ...
    // but wait a tick first to avoid one-time devMode
    // unidirectional-data-flow-violation error
    setTimeout(() => this.seconds = () => this.timerComponent.seconds, 0);
  }
  // 组件通过这种方式调用子组件的方法
  start() { this.timerComponent.start(); }
  stop() { this.timerComponent.stop(); }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/