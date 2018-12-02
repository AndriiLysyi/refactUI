import { Component, ViewChild, AfterViewInit } from '@angular/core';
declare let ace: any;

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements AfterViewInit {
  myCode = 'for(var i=0; i<100; i++) {\nfunction(variable){\nt}\n\n}';
  @ViewChild('codeEditor') codeEditor;

  onRuleChange(e) {
    console.log(e.toString());
  }

  ngAfterViewInit() {
    //const Range = ace.require('ace/range')['Range'];
    const editor = this.codeEditor.getEditor();
    editor.getSession().setMode("ace/mode/javascript");   
  }

}
