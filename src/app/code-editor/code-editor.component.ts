import { Component, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
declare let ace: any;

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
  
  myCode = 'for(var i=0; i<100; i++) {\nfunction(variable){\nt}\n\n}';
  errorResponse = "brackets are not closed\n\n\n\n\n\n\n\n\n\nthat's all";
  isResultingPage = false;

  @ViewChild('codeEditor') codeEditor;
  @ViewChild('errorEditor') errorEditor;

  onRuleChange(e) {
    console.log(e.toString());
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
    responseEditor.getSession().on('changeScrollTop', function(scroll) {
      editor.getSession().setScrollTop(parseInt(scroll) || 0)
    });
    return true;
  }

  sendAnswer() {
    this.isResultingPage = true;
    setTimeout(()=>this.initErrorEditor(), 0);
    clearInterval(this.timerThreadId);
    
  }
}
