import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Tree.Frontend';

  constructor(private http: HttpClient, private renderer: Renderer2) {}

  ngOnInit() {
    this.http.get("https://localhost:7052/api/Tree").subscribe((res: any) => {
      this.renderTree(res);
    });
  }

  renderTree(res: any) {
    let structure = (<HTMLInputElement>(document.getElementById("structure")));
    
    for (let index = 0; index < res.length; index++) {
      console.log(res[index]);

      const ul: HTMLParagraphElement = this.renderer.createElement('ul');
      const li: HTMLParagraphElement = this.renderer.createElement('li');
      const button: HTMLParagraphElement = this.renderer.createElement('button');
      const buttonSpan: HTMLParagraphElement = this.renderer.createElement('div');
      const buttonContainer: HTMLParagraphElement = this.renderer.createElement('div');
      const addButton: HTMLParagraphElement = this.renderer.createElement('button');
      const changeButton: HTMLParagraphElement = this.renderer.createElement('button');
      const deleteButton: HTMLParagraphElement = this.renderer.createElement('button');
      const sortButton: HTMLParagraphElement = this.renderer.createElement('button');
      
      const buttonIcon: HTMLParagraphElement = this.renderer.createElement('i');

      let parentNode = (<HTMLInputElement>(document.getElementById(res[index].parentID)));
      
      if(parentNode != null)
      {
        ul.classList.add("folder-container");

        this.renderer.appendChild(parentNode, ul);

        button.classList.add("btn");
        button.classList.add("folder-bg");
        button.classList.add("w-100");
        button.classList.add("text-start");
        button.classList.add("d-flex");
        button.classList.add("justify-content-between");

        // Button icon start \\

        buttonIcon.classList.add("bi");
        buttonIcon.classList.add("bi-folder-fill");
        buttonIcon.classList.add("float-start");
        buttonIcon.classList.add("me-2");

        // Button icon end \\
        
        // Button text start \\

        buttonSpan.textContent = res[index].name;
        buttonSpan.classList.add("mt-2-5");
        
        button.appendChild(buttonSpan);

        buttonSpan.appendChild(buttonIcon);

        // Button text end \\

        li.classList.add("list-unstyled");
        li.classList.add("mt-1");

        if (res[index].parentID > 2)
        {
          li.classList.add("d-none");
        }

        li.id = res[index].treeID;         
        li.appendChild(button);
        

        ul.appendChild(li);
      }
      else
      {
        structure.classList.add("folder-container");

        button.classList.add('btn');
        button.classList.add('folder-bg');
        button.classList.add('w-100');
        button.classList.add('text-start');
        button.classList.add("d-flex");
        button.classList.add("justify-content-between");

        // Button icon start \\

        buttonIcon.classList.add("bi");
        buttonIcon.classList.add("bi-folder-fill");
        buttonIcon.classList.add("float-start");
        buttonIcon.classList.add("me-2");

        // Button icon end \\
        
        // Button text start \\

        buttonSpan.textContent = res[index].name;
        buttonSpan.classList.add("mt-2-5");
        
        button.appendChild(buttonSpan);

        buttonSpan.appendChild(buttonIcon);

        // Button text end \\

        li.classList.add('list-unstyled');
        li.classList.add('mt-1');

        li.id = res[index].treeID;
        li.appendChild(button);
        this.renderer.appendChild(structure, li);
      }
    }
  }
}
