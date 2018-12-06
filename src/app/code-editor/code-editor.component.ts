import { Component, ViewChild, AfterViewInit } from '@angular/core';
declare let ace: any;

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements AfterViewInit {
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
    
  }
}
