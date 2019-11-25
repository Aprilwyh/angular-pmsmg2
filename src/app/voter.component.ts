import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-voter',
  template: `
    <h4>{{name}}</h4>
    <button (click)="vote(true)"  [disabled]="didVote">Agree</button>
    <button (click)="vote(false)" [disabled]="didVote">Disagree</button>
  `
})
export class VoterComponent {
  @Input()  name: string;
  // 子组件暴露一个EventEmitter属性，这是一个输出属性，通常带有@Output装饰器
  @Output() voted = new EventEmitter<boolean>();
  didVote = false;

  // 事件发生时子组件利用该属性emits向上弹射事件，父组件绑定到这个事件属性，并在事件触发时做出回应
  vote(agreed: boolean) {
    this.voted.emit(agreed);
    this.didVote = true;
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/