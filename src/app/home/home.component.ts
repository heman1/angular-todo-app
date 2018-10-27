import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
    //we can write inline html here. insteadof templateurl-> template : ` `,
    //the same goes with css, we can inline cs here styleUrls-> stykes: [` `]
  styleUrls: ['./home.component.scss'],
    animations: [
        trigger('goals', [
            transition('* => *', [
                query(':enter', style({opacity: 0}), {optional:true}),
                
                query(':enter', stagger('300ms', [
                    animate('.6s ease-in', keyframes([
                style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
                style({opacity:.5, transform: 'translateY(35px)', offset: .3}),
                style({opacity: 1, transform: 'translateY(0)', offset: 1}),
                    ]))
                ]), {optional: true}),// second query close
                
                query(':leave', stagger('300ms', [
                    animate('.6s ease-in', keyframes([
                style({opacity: 1, transform: 'translateY(0)', offset: 0}),
                style({opacity:.5, transform: 'translateY(35px)', offset: .3}),
                style({opacity: 0, transform: 'translateY(-75%)', offset: 1}),
                    ]))
                ]), {optional: true})
            ]) // transition close
        ]) //trigger close
    ] //animation close
})
export class HomeComponent implements OnInit {
    
    itemCount: number= 4;
    goalText: string="my first goal";
    goals = [];

  constructor(private _data: DataService) { }

  ngOnInit() {
      //initiated when app loads
      this._data.goal.subscribe(res=> this.goals=res);
      this.itemCount = this.goals.length;
      this._data.changeGoal(this.goals);
  }

  addItem() {
    this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  removeItem(i) {
      this.goals.splice(i, 1);
      this._data.changeGoal(this.goals);
  }

}
