import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TreeService } from 'src/service/Tree.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Tree.Frontend';

  constructor(private http: HttpClient, private treeService: TreeService) {}

  ngOnInit() {
    this.http.get("https://localhost:7052/api/Tree").subscribe((res: any) => {
      this.treeService.renderTree(res);
    });
  }

  sortOnClick(parentID: string) {
    let rootComponent: any = (<HTMLInputElement>(document.getElementById(parentID)));
    let tmp = [];

    for (const child of rootComponent.children) {
      if (child.tagName == "UL")
      {
        tmp.push(child);
      }
    }
    
    tmp.reverse();

    for (let index = 0; index < tmp.length; index++) {
      rootComponent.removeChild(rootComponent.lastChild);
    }

    tmp.forEach(element => {
      rootComponent.appendChild(element);
    });
  }

  expandOnClick() {
    this.http.get("https://localhost:7052/api/Tree").subscribe((res: any) => {
      let tmp = [1,2,3];

      for (let index = 0; index < res.length; index++) {
        tmp.push(res[index].treeID);
      }

      let maxID = tmp.reduce((a, b) => Math.max(a, b), -Infinity);
    
      for (let index = 3; index < maxID + 1; index++) {
        let expandElement = (<HTMLInputElement>(document.getElementById(index.toString())));
  
        if (expandElement != null)
        {
          expandElement.classList.remove("d-none");
        }
      }
    });
  }

  info() {
    alert("Informacje o przyciskach: \n" +
    "- Niebieski przycisk służy do tworzenia folderów \n" +
    "- Żółty przycisk pozwala edytować nazwe folderu \n" +
    "- Czerwony przycisk usuwa cały folder razem z jego podfolderami \n" +
    "- Zielony przycisk służy do zmiany kolejności sortowania folderów \n" +
    "- Szary przycisk rozwija całą strukture folderu wraz z jego podfolderami");
  }
}
