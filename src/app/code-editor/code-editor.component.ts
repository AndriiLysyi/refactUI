import { Component, ViewChild, AfterViewInit } from '@angular/core';
declare let ace: any;

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements AfterViewInit {
  content = '<strong>Hi</strong>';
  contentAutoUpdate = 'SELECT * FROM autoUpdate;';
  myCode = 'SELECT * FROM tabs;';
  @ViewChild('highlight') highlight;
  @ViewChild('editorInfinity') editorInfinity;
  @ViewChild('firstEditor') firstEditor;

  onRuleChange(e) {
    console.log(e);
  }

  ngAfterViewInit() {
    const Range = ace.require('ace/range')['Range'];

    this.highlight
      .getEditor()
      .session.addMarker(new Range(0, 0, 2, 1), 'myMarker', 'fullLine');

    this.firstEditor.getEditor().session.setOption('useWorker', true);
  }

}
