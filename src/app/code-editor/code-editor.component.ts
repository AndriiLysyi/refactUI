import { Component, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import {TaskService} from '../_services/task.service';
import {Task} from "../_models/task";
import {TaskResult, Mistake} from '../_models/taskResult';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements AfterViewInit, AfterContentInit {
  
  secondsLeft: number = 30;
  minutesLeft: number = 2;
  timerThreadId;

  ngAfterContentInit(): void {
    if (!this.isResultingPage) {
      this.timerThreadId = setInterval(()=> {
        if (this.secondsLeft) {
          this.secondsLeft--;          
        } else if (this.minutesLeft) {
          this.minutesLeft--;
          this.secondsLeft = 59;
        } else {
          //post to server
          this.sendAnswer();
          clearInterval(this.timerThreadId);
        }
      }, 1000);
    }    
  }
  
  task= new Task;
  mistakes: Mistake[];
  errorString: string ="";
  isResultingPage = false;

  @ViewChild('codeEditor') codeEditor;
  @ViewChild('errorEditor') errorEditor;

  onRuleChange(e) {
    console.log(e.toString());
  }

  constructor(private taskService: TaskService) {
   

    var component = this;
    taskService.getTask().subscribe( data=>{
      component.task = data[0];
    });
  }

  ngAfterViewInit() {      
    const editor = this.codeEditor.getEditor();
    editor.setShowPrintMargin(false);    
    editor.getSession().setMode("ace/mode/javascript");  
  }

  initErrorEditor() {
    const editor = this.codeEditor.getEditor();

    const responseEditor = this.errorEditor.getEditor();
    responseEditor.renderer.setShowGutter(false);    
    responseEditor.getSession().setMode("ace/mode/text");

    //synchronous scrolling
    editor.getSession().on('changeScrollTop', function(scroll) {
      responseEditor.getSession().setScrollTop(parseInt(scroll) || 0)
    });   
    return true;
  }

  sendAnswer() {
    this.taskService.register({
      taskId: this.task.id,
      code: this.task.code,
      time: 150 - (this.secondsLeft+ this.minutesLeft*60)
    }).subscribe(data=>{
      let line = 1;
      let errorString="";
      data.mistakes.forEach(el=>{
        while (el.line>line) {
          line++;
          errorString+="\n";

        }
        errorString+=el.description+" ";
      });
      this.errorString = errorString;
    });
    
    this.isResultingPage = true;
    setTimeout(()=>this.initErrorEditor(), 0);
    clearInterval(this.timerThreadId);
    
  }
}
