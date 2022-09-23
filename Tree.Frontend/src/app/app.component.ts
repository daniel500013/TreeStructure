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
      
      if (parentNode != null)
      {
        ul.classList.add("folder-container");

        ul.addEventListener("dragover", this.dragOver.bind(this));

        this.renderer.appendChild(parentNode, ul);

        button.classList.add("btn");
        button.classList.add("folder-bg");
        button.classList.add("w-100");
        button.classList.add("text-start");
        button.classList.add("d-flex");
        button.classList.add("justify-content-between");

        button.draggable = true;

        button.addEventListener('click', this.onClick.bind(this));
        button.addEventListener('dragstart', this.dragStart.bind(this));
        button.addEventListener('dragend', this.dragStop.bind(this));

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

        // Container start \\

        addButton.textContent = 'Dodaj';
        addButton.classList.add('btn');
        addButton.classList.add('btn-primary');
        addButton.classList.add('m-1');
        addButton.addEventListener('click', this.addOnClick.bind(this));

        changeButton.textContent = "Zmień";
        changeButton.classList.add('btn');
        changeButton.classList.add('btn-warning');
        changeButton.classList.add('text-white');
        changeButton.classList.add('m-1');
        changeButton.addEventListener('click', this.changeOnClick.bind(this));

        deleteButton.textContent = "Usuń";
        deleteButton.classList.add("btn");
        deleteButton.classList.add("btn-danger");
        deleteButton.classList.add("m-1");
        deleteButton.addEventListener('click', this.deleteOnClick.bind(this));

        sortButton.textContent = "Sortuj";
        sortButton.classList.add("btn");
        sortButton.classList.add("btn-success");
        sortButton.classList.add("m-1");
        sortButton.addEventListener('click', this.sortOnClick.bind(this, res[index].treeID));

        buttonContainer.appendChild(addButton);
        buttonContainer.appendChild(changeButton);
        buttonContainer.appendChild(deleteButton);
        buttonContainer.appendChild(sortButton);

        button.appendChild(buttonContainer);

        // Container end \\

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

        structure.addEventListener("dragover", this.dragOver.bind(this));

        button.classList.add('btn');
        button.classList.add('folder-bg');
        button.classList.add('w-100');
        button.classList.add('text-start');
        button.classList.add("d-flex");
        button.classList.add("justify-content-between");

        button.addEventListener('click', this.onClick.bind(this));

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

        // Container start \\

        addButton.textContent = 'Dodaj';
        addButton.classList.add('btn');
        addButton.classList.add('btn-primary');
        addButton.classList.add('m-1');
        addButton.addEventListener('click', this.addOnClick.bind(this));

        buttonContainer.appendChild(addButton);

        button.appendChild(buttonContainer);

        // Container end \\

        li.classList.add('list-unstyled');
        li.classList.add('mt-1');

        li.id = res[index].treeID;
        li.appendChild(button);
        this.renderer.appendChild(structure, li);
      }
    }
  }

  onClick(event: any) {
    let getUlChild = event.target.parentElement.children;
    
    for (const child of getUlChild) {
      if (child.tagName == "UL")
      {
        for (const children of child.children) {
          if (children.classList.contains("d-none"))
          {
            children.classList.remove("d-none");
          }
          else
          {
            children.classList.add("d-none");
          }
        }
      }
    }
  }

  addNode(res: any, parentID: any) {
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

    ul.classList.add("folder-container");

    ul.addEventListener("dragover", this.dragOver.bind(this));

    parentID.appendChild(ul);

    //button.textContent = res[index].name;

    button.classList.add('btn');
    button.classList.add('folder-bg');
    button.classList.add('w-100');
    button.classList.add('text-start');
    button.classList.add('d-flex');
    button.classList.add('justify-content-between');

    button.draggable = true;

    button.addEventListener('click', this.onClick.bind(this));
    button.addEventListener('dragstart', this.dragStart.bind(this));
    button.addEventListener('dragend', this.dragStop.bind(this));

    // Button icon start \\

    buttonIcon.classList.add('bi');
    buttonIcon.classList.add('bi-folder-fill');
    buttonIcon.classList.add('float-start');
    buttonIcon.classList.add('me-2');

    // Button icon end \\

    // Button text start \\

    buttonSpan.textContent = res.name;
    buttonSpan.classList.add('mt-2-5');

    button.appendChild(buttonSpan);

    buttonSpan.appendChild(buttonIcon);

    // Button text end \\

    // Container start \\

    addButton.textContent = 'Dodaj';
    addButton.classList.add('btn');
    addButton.classList.add('btn-primary');
    addButton.classList.add('m-1');
    addButton.addEventListener('click', this.addOnClick.bind(this));

    changeButton.textContent = "Zmień";
    changeButton.classList.add('btn');
    changeButton.classList.add('btn-warning');
    changeButton.classList.add('text-white');
    changeButton.classList.add('m-1');
    changeButton.addEventListener('click', this.changeOnClick.bind(this));

    deleteButton.textContent = "Usuń";
    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-danger");
    deleteButton.classList.add("m-1");
    deleteButton.addEventListener('click', this.deleteOnClick.bind(this));

    sortButton.textContent = "Sortuj";
    sortButton.classList.add("btn");
    sortButton.classList.add("btn-success");
    sortButton.classList.add("m-1");
    sortButton.addEventListener('click', this.sortOnClick.bind(this, res.treeID));

    buttonContainer.appendChild(addButton);
    buttonContainer.appendChild(changeButton);
    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(sortButton);

    button.appendChild(buttonContainer);

    // Container end \\

    li.classList.add('list-unstyled');
    li.classList.add('mt-1');

    // li.id = res[index].treeID;
    li.id = res.treeID;
    li.appendChild(button);

    ul.appendChild(li);
  }

  addOnClick(event: any) {
    let parentID = event.target.parentElement.parentElement.parentElement;

    let name: any = prompt("Nazwa folderu:");

    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (format.test(name)) {
      alert("Nazwa folderu nie może zawierać znaków specjalnych!")
    }
    else {
      const treeDto = {
        treeID: 0,
        name: name,
        parentID: parentID.id
      }
  
      this.http.post("https://localhost:7052/api/Tree", treeDto).subscribe((res: any) => {
        this.addNode(res, parentID);
      });
    }
  }

  changeOnClick(event: any) {
    let parentID = event.target.parentElement.parentElement.parentElement;

    let name = prompt("Nowa nazwa folderu:");

    const treeDto = {
      treeID: parentID.id,
      name: name,
      parentID: parentID.parentElement.parentElement.id
    }

    this.http.put("https://localhost:7052/api/Tree", treeDto).subscribe((res) => {
      //console.log(event.target.parentElement.parentElement.firstChild);
      event.target.parentElement.parentElement.firstChild.textContent = name;

      const buttonIcon: HTMLParagraphElement = this.renderer.createElement('i');

      buttonIcon.classList.add('bi');
      buttonIcon.classList.add('bi-folder-fill');
      buttonIcon.classList.add('float-start');
      buttonIcon.classList.add('me-2');

      event.target.parentElement.parentElement.firstChild.appendChild(buttonIcon);
    });
  }

  deleteOnClick(event: any) {
    let parentID = event.target.parentElement.parentElement.parentElement.id;

    this.http.delete("https://localhost:7052/api/Tree/" + parentID).subscribe(() => {
      let componentToRemove = (<HTMLInputElement>(document.getElementById(parentID)));
      componentToRemove.parentElement?.remove();
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

  dragStart(event: any) {
    let button = event.target;
    button.classList.add("drag");
  }

  dragStop(event: any) {
    let button = event.target;
    button.classList.remove("drag");

    let treeID = event.target.parentElement.id;
    let name = event.target.textContent.replace("DodajZmieńUsuńSortuj", "");
    let parentID = event.target.parentElement.parentElement.parentElement.id;
    
    let treeDto = {
      treeID: treeID,
      name: name,
      parentID: parentID
    }
    
    this.http.put("https://localhost:7052/api/Tree", treeDto).subscribe();
  }

  dragOver(event: any) {
    let dragButton = (<HTMLInputElement>(document.querySelector(".drag"))).parentElement;
    let folderContainer = event.target.parentElement;
    
    for (const child of folderContainer.children) {
      if (child.tagName == "UL" && child.firstChild.classList.contains("d-none"))
      {
        dragButton?.classList.add("d-none");
      }
      else
      {
        dragButton?.classList.remove("d-none");
      }
    }
    
    if (folderContainer.tagName == "LI")
    {
      folderContainer.appendChild(dragButton?.parentElement);
    }
  }
}
