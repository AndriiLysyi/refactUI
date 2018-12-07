import { Component, OnInit } from '@angular/core';

import { AlertService, AuthenticationService, UserService } from '../_services';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  
  constructor( private userService : UserService){
    this.userService.getById(this.userService.getCurrentUserId()).subscribe(data=> {
      console.log(data);
      this.setData2(data);
      this.setData(data);
    });
  }
  ngOnInit(){}
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[]=[];
  public barChartType: string = 'line';
  public barChartLegend: boolean = true;
  public times : string[]=[];
  public mistakes : any[]=[];  

  public barChartData: any[] = [
    { data: [], label: 'Кількість помилок' }
  ];
  public chartColors: Array<any> = [
    { // all colors in order
      backgroundColor: ['#55a']
    }
];


////2 chart
public barChartOptions2: any = {
  scaleShowVerticalLines: false,
  responsive: true
};
public barChartLabels2: string[]=[];
public barChartType2: string = 'line';
public barChartLegend2: boolean = true;

public barChartData2: any[] = [

  { data: [], label: 'Час виконання ' }
];



  setData(data: any) {
let temp = JSON.parse(JSON.stringify(this.barChartData));
let labels = [];// JSON.parse(JSON.stringify(this.barChartLabels));
labels.length = data.taskStory.length;
temp[0].data.length = 0;
//temp[1].data.length = 0;
this.barChartLabels.length = 0;
    for(var _i = 0; _i < data.taskStory.length; _i++ )
    {
      
      this.barChartLabels.push(`${_i+1} спроба`);
   // temp[1].data[_i] = data.taskStory[_i].time;
    temp[0].data[_i] = data.taskStory[_i].mistakes.length;
    }
    debugger
    console.log(temp);
    console.log(labels);
    //this.barChartLabels.labels;
    this.barChartData = temp;
  }

  setData2(data: any) {
    let temp = JSON.parse(JSON.stringify(this.barChartData2));
    let labels = [];// JSON.parse(JSON.stringify(this.barChartLabels));
    labels.length = data.taskStory.length;
    temp[0].data.length = 0;
   // temp[1].data.length = 0;
    this.barChartLabels2.length = 0;
        for(var _i = 0; _i < data.taskStory.length; _i++ )
        {
          
          this.barChartLabels2.push(`${_i+1} спроба`);
        temp[0].data[_i] = data.taskStory[_i].time;
       // temp[0].data[_i] = data.taskStory[_i].mistakes.length;
        }
        debugger
        console.log(temp);
        console.log(labels);
        //this.barChartLabels.labels;
        this.barChartData2 = temp;
      }
    


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public randomize(): void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
}
