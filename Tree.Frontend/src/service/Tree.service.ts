import { HttpClient } from '@angular/common/http';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  private renderer: Renderer2;

  constructor(private http: HttpClient, private rendererFactory: RendererFactory2) { 
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  renderTree(res: any) {
    let structure = (<HTMLInputElement>(document.getElementById("structure")));
    
    for (let index = 0; index < res.length; index++) {
      const ul: HTMLParagraphElement = this.renderer.createElement('ul');
      const li: HTMLParagraphElement = this.renderer.createElement('li');
      const button: HTMLParagraphElement = this.renderer.createElement('button');
      const buttonSpan: HTMLParagraphElement = this.renderer.createElement('div');
      const buttonContainer: HTMLParagraphElement = this.renderer.createElement('div');
      const addButton: HTMLParagraphElement = this.renderer.createElement('button');
      const changeButton: HTMLParagraphElement = this.renderer.createElement('button');
      const deleteButton: HTMLParagraphElement = this.renderer.createElement('button');
      const sortButton: HTMLParagraphElement = this.renderer.createElement('button');
      const leafButton: HTMLParagraphElement = this.renderer.createElement('button');
      
      const buttonIcon: HTMLParagraphElement = this.renderer.createElement('i');
      const AddButtonIcon: HTMLParagraphElement = this.renderer.createElement('i');
      const EditButtonIcon: HTMLParagraphElement = this.renderer.createElement('i');
      const DeleteButtonIcon: HTMLParagraphElement = this.renderer.createElement('i');
      const SortButtonIcon: HTMLParagraphElement = this.renderer.createElement('i');
      const LeafButtonIcon: HTMLParagraphElement = this.renderer.createElement('i');

      let parentNode = (<HTMLInputElement>(document.getElementById(res[index].parentID)));
      
      if (parentNode != null)
      {
        // Dodanie klasy identyfikuj??cej do upuszczenia folderu
        ul.classList.add("folder-container");

        // Dodanie funkcjonalno??ci przeniesienia folderu (drag&drop)
        ul.addEventListener("dragover", this.dragOver.bind(this));

        // Dodanie listy do g????wnej struktury
        this.renderer.appendChild(parentNode, ul);

        // Dodawanie klas do przycisku folderu drzewa
        button.classList.add("btn");
        button.classList.add("folder-bg");
        button.classList.add("w-100");
        button.classList.add("text-start");
        button.classList.add("d-flex");
        button.classList.add("justify-content-between");

        // Dodawanie atrybutu umo??liwiaj??cego przenoszenie go
        button.draggable = true;

        // Dodanie funkcjonalno??ci rozwini??cia struktury przy klikni??ciu
        button.addEventListener('click', this.onClick.bind(this));

        // Dodanie funkcjonalno??ci drag and drop
        button.addEventListener('dragstart', this.dragStart.bind(this));
        button.addEventListener('dragend', this.dragStop.bind(this));

        // Dodawanie klas do ikony folderu
        buttonIcon.classList.add("bi");
        buttonIcon.classList.add("bi-folder-fill");
        buttonIcon.classList.add("float-start");
        buttonIcon.classList.add("me-2");
        
        // Ustawienie klasy oraz tekstu przycisku
        buttonSpan.textContent = res[index].name;
        buttonSpan.classList.add("mt-2-5");
        
        // Dodanie tekstu do przycisku
        button.appendChild(buttonSpan);

        // Dodanie ikony do tekstu
        buttonSpan.appendChild(buttonIcon);

        // Konfiguracja ikony 'Dodaj'
        AddButtonIcon.classList.add("bi");
        AddButtonIcon.classList.add("bi-folder-plus");
        
        // Konfiguracja przycisku 'Dodaj' przy folderze
        addButton.classList.add('btn');
        addButton.classList.add('btn-primary');
        addButton.classList.add('m-1');
        addButton.addEventListener('click', this.addOnClick.bind(this));
        addButton.appendChild(AddButtonIcon);

        // Konfiguracja ikony 'Zmie??'
        EditButtonIcon.classList.add("bi");
        EditButtonIcon.classList.add("bi-cursor-text");

        // Konfiguracja przycisku 'Zmie??' przy folderze
        changeButton.classList.add('btn');
        changeButton.classList.add('btn-warning');
        changeButton.classList.add('text-white');
        changeButton.classList.add('m-1');
        changeButton.addEventListener('click', this.changeOnClick.bind(this));
        changeButton.appendChild(EditButtonIcon);

        // Konfiguracja ikony 'Usu??'
        DeleteButtonIcon.classList.add("bi");
        DeleteButtonIcon.classList.add("bi-folder-x");

        // Konfiguracja przycisku 'Usu??' przy folderze
        deleteButton.classList.add("btn");
        deleteButton.classList.add("btn-danger");
        deleteButton.classList.add("m-1");
        deleteButton.addEventListener('click', this.deleteOnClick.bind(this));
        deleteButton.appendChild(DeleteButtonIcon);

        // Konfiguracja ikony 'Sortuj'
        SortButtonIcon.classList.add("bi");
        SortButtonIcon.classList.add("bi-bar-chart");

        // Konfiguracja przycisku 'Sortuj' przy folderze
        sortButton.classList.add("btn");
        sortButton.classList.add("btn-success");
        sortButton.classList.add("m-1");
        sortButton.addEventListener('click', this.sortOnClick.bind(this, res[index].treeID));
        sortButton.appendChild(SortButtonIcon);

        // Konfiguracja ikony 'Rozwi?? w??ze??'
        LeafButtonIcon.classList.add("bi");
        LeafButtonIcon.classList.add("bi-folder2-open");

        // Konfiguracja przycisku 'Rozwi?? w??ze??' przy folderze
        leafButton.classList.add("btn");
        leafButton.classList.add("btn-secondary");
        leafButton.classList.add("m-1");
        leafButton.addEventListener('click', this.expandLeafOnClick.bind(this));
        leafButton.appendChild(LeafButtonIcon);

        // Dodanie przycisk??w do kontenera
        buttonContainer.appendChild(addButton);
        buttonContainer.appendChild(changeButton);
        buttonContainer.appendChild(deleteButton);
        buttonContainer.appendChild(sortButton);
        buttonContainer.appendChild(leafButton);

        // Dodanie kontenera do przycisku folderu
        button.appendChild(buttonContainer);

        // Dodanie klas do elementu listy
        li.classList.add("list-unstyled");
        li.classList.add("mt-1");

        // Ukrycie elementu je??eli jego id rodzica jest wi??ksze ni?? 2
        if (res[index].parentID > 2)
        {
          li.classList.add("d-none");
        }

        // Przypisanie id elementowi listy
        li.id = res[index].treeID;         
        
        // Dodanie przycisku do elementu listy
        li.appendChild(button);

        // Dodanie elementu listy do listy
        ul.appendChild(li);
      }
      else
      {
        // Dodanie klasy identyfikuj??cej do upuszczenia folderu
        structure.classList.add("folder-container");

        // Dodanie funkcjonalno??ci przeniesienia folderu (drag&drop)
        structure.addEventListener("dragover", this.dragOver.bind(this));

        // Dodawanie klas do przycisku folderu drzewa
        button.classList.add('btn');
        button.classList.add('folder-bg');
        button.classList.add('w-100');
        button.classList.add('text-start');
        button.classList.add("d-flex");
        button.classList.add("justify-content-between");

        // Dodanie funkcjonalno??ci rozwini??cia struktury przy klikni??ciu
        button.addEventListener('click', this.onClick.bind(this));

        // Dodawanie klas do ikony folderu
        buttonIcon.classList.add("bi");
        buttonIcon.classList.add("bi-folder-fill");
        buttonIcon.classList.add("float-start");
        buttonIcon.classList.add("me-2");

        // Ustawienie klasy oraz tekstu przycisku
        buttonSpan.textContent = res[index].name;
        buttonSpan.classList.add("mt-2-5");
        
        // Dodanie tekstu do przycisku
        button.appendChild(buttonSpan);

        // Dodanie ikony do tekstu
        buttonSpan.appendChild(buttonIcon);

        // Konfiguracja ikony 'Dodaj'
        AddButtonIcon.classList.add("bi");
        AddButtonIcon.classList.add("bi-folder-plus");

        // Konfiguracja przycisku 'Dodaj' przy folderze
        addButton.classList.add('btn');
        addButton.classList.add('btn-primary');
        addButton.classList.add('m-1');
        addButton.addEventListener('click', this.addOnClick.bind(this));
        addButton.appendChild(AddButtonIcon);

        // Dodanie przycisku do kontenera
        buttonContainer.appendChild(addButton);

        // Dodanie kontenera do przycisku folderu
        button.appendChild(buttonContainer);

        // Dodanie klas do elementu listy
        li.classList.add('list-unstyled');
        li.classList.add('mt-1');

        // Przypisanie id elementowi listy
        li.id = res[index].treeID;
        
        // Dodanie przycisku do elementu listy
        li.appendChild(button);
        
        // Dodanie elementu listy do listy
        this.renderer.appendChild(structure, li);
      }
    }
  }

  onClick(event: any) {
    // Pobieranie listy wszystkich 'dzieci' elementu listy
    let getUlChild = event.target.parentElement.children;
    
    // Pobieranie pojedy??czego elementu
    for (const child of getUlChild) {
      if (child.tagName == "UL")
      {
        for (const children of child.children) {
          // Aktywacja lub ukruwanie obiektu
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
    const leafButton: HTMLParagraphElement = this.renderer.createElement('button');

    const buttonIcon: HTMLParagraphElement = this.renderer.createElement('i');
    const AddButtonIcon: HTMLParagraphElement = this.renderer.createElement('i');
    const EditButtonIcon: HTMLParagraphElement = this.renderer.createElement('i');
    const DeleteButtonIcon: HTMLParagraphElement = this.renderer.createElement('i');
    const SortButtonIcon: HTMLParagraphElement = this.renderer.createElement('i');
    const LeafButtonIcon: HTMLParagraphElement = this.renderer.createElement('i');

    // Dodanie klasy identyfikuj??cej do upuszczenia folderu
    ul.classList.add("folder-container");

    // Dodanie funkcjonalno??ci przeniesienia folderu (drag&drop)
    ul.addEventListener("dragover", this.dragOver.bind(this));

    // Dodanie listy do elementu listy
    parentID.appendChild(ul);

    // Dodawanie klas do przycisku folderu drzewa
    button.classList.add('btn');
    button.classList.add('folder-bg');
    button.classList.add('w-100');
    button.classList.add('text-start');
    button.classList.add('d-flex');
    button.classList.add('justify-content-between');

    // Dodawanie atrybutu umo??liwiaj??cego przenoszenie go
    button.draggable = true;

    // Dodanie funkcjonalno??ci rozwini??cia struktury przy klikni??ciu
    button.addEventListener('click', this.onClick.bind(this));
    
    // Dodanie funkcjonalno??ci drag and drop
    button.addEventListener('dragstart', this.dragStart.bind(this));
    button.addEventListener('dragend', this.dragStop.bind(this));

    // Dodawanie klas do ikony folderu
    buttonIcon.classList.add('bi');
    buttonIcon.classList.add('bi-folder-fill');
    buttonIcon.classList.add('float-start');
    buttonIcon.classList.add('me-2');

    // Ustawienie klasy oraz tekstu przycisku
    buttonSpan.textContent = res.name;
    buttonSpan.classList.add('mt-2-5');

    // Dodanie tekstu do przycisku
    button.appendChild(buttonSpan);

    // Dodanie ikony do tekstu
    buttonSpan.appendChild(buttonIcon);

    // Konfiguracja ikony 'Dodaj'
    AddButtonIcon.classList.add("bi");
    AddButtonIcon.classList.add("bi-folder-plus");

    // Konfiguracja przycisku 'Dodaj' przy folderze
    addButton.classList.add('btn');
    addButton.classList.add('btn-primary');
    addButton.classList.add('m-1');
    addButton.addEventListener('click', this.addOnClick.bind(this));
    addButton.appendChild(AddButtonIcon);

    // Konfiguracja ikony 'Zmie??'
    EditButtonIcon.classList.add("bi");
    EditButtonIcon.classList.add("bi-cursor-text");

    // Konfiguracja przycisku 'Zmie??' przy folderze
    changeButton.classList.add('btn');
    changeButton.classList.add('btn-warning');
    changeButton.classList.add('text-white');
    changeButton.classList.add('m-1');
    changeButton.addEventListener('click', this.changeOnClick.bind(this));
    changeButton.appendChild(EditButtonIcon);

    // Konfiguracja ikony 'Usu??'
    DeleteButtonIcon.classList.add("bi");
    DeleteButtonIcon.classList.add("bi-folder-x");

    // Konfiguracja przycisku 'Usu??' przy folderze
    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-danger");
    deleteButton.classList.add("m-1");
    deleteButton.addEventListener('click', this.deleteOnClick.bind(this));
    deleteButton.appendChild(DeleteButtonIcon);

    // Konfiguracja ikony 'Sortuj'
    SortButtonIcon.classList.add("bi");
    SortButtonIcon.classList.add("bi-bar-chart");

    // Konfiguracja przycisku 'Sortuj' przy folderze
    sortButton.classList.add("btn");
    sortButton.classList.add("btn-success");
    sortButton.classList.add("m-1");
    sortButton.addEventListener('click', this.sortOnClick.bind(this, res.treeID));
    sortButton.appendChild(SortButtonIcon);

    // Konfiguracja ikony 'Rozwi?? w??ze??'
    LeafButtonIcon.classList.add("bi");
    LeafButtonIcon.classList.add("bi-folder2-open");

    // Konfiguracja przycisku 'Rozwi?? w??ze??' przy folderze
    leafButton.classList.add("btn");
    leafButton.classList.add("btn-secondary");
    leafButton.classList.add("m-1");
    leafButton.addEventListener('click', this.expandLeafOnClick.bind(this));
    leafButton.appendChild(LeafButtonIcon);

    // Dodanie przycisk??w do kontenera
    buttonContainer.appendChild(addButton);
    buttonContainer.appendChild(changeButton);
    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(sortButton);
    buttonContainer.appendChild(leafButton);

    // Dodanie kontenera do przycisku folderu
    button.appendChild(buttonContainer);

    // Dodanie klas do elementu listy
    li.classList.add('list-unstyled');
    li.classList.add('mt-1');

    let mainParent: any = (<HTMLInputElement>(document.getElementById(parentID.id.toString())));
    for (const child of mainParent.children) {
      if (child.tagName == "UL")
      {
        if (child.lastChild != null)
        {
          if (child.lastChild.classList.contains("d-none")) {
            li.classList.add('d-none');
          }
          else {
            li.classList.remove('d-none');
          }
        }
      }
    }

    // if (parentID.lastChild.lastChild.classList.contains("d-none"))
    // {
    //   li.classList.add('d-none');
    // }

    // Przypisanie id elementowi listy
    li.id = res.treeID;

    // Dodanie przycisku do elementu listy
    li.appendChild(button);

    // Dodanie elementu listy do listy
    ul.appendChild(li);
  }

  addOnClick(event: any) {
    // Pobieranie elementu rodzica
    let parentID = event.target.parentElement.parentElement.parentElement;

    // Pobieranie nazwy folderu
    let name: any = prompt("Nazwa folderu:");

    // Niedozwolone znaki w folderze
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    // Walidacja danych
    if (format.test(name) || name == "" || name.charAt(0) == ' ') {
      alert("Nazwa folderu nie mo??e zawiera?? znak??w specjalnych ani by?? pusta!");
    }
    else {
      // Dto 
      const treeDto = {
        treeID: 0,
        name: name,
        parentID: parentID.id
      }
  
      // Dodanie folderu do drzewa
      this.http.post("https://localhost:7052/api/Tree", treeDto).subscribe((res: any) => {
        // Lokalne dodanie elementu do drzewa
        this.addNode(res, parentID);
      });
    }
  }

  changeOnClick(event: any) {
    // Pobieranie elementu rodzica
    let parentID = event.target.parentElement.parentElement.parentElement;

    // Pobieranie nazwy folderu
    let name: any = prompt("Nowa nazwa folderu:");

    // Niedozwolone znaki w folderze
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    
    // Walidacja danych
    if (format.test(name) || name == "" || name.charAt(0) == ' ') {
      alert("Nazwa folderu nie mo??e zawiera?? znak??w specjalnych ani by?? pusta!");
    }
    else {
      // Dto
      const treeDto = {
        treeID: parentID.id,
        name: name,
        parentID: parentID.parentElement.parentElement.id
      }
  
      // Zmiana danych w drzewie
      this.http.put("https://localhost:7052/api/Tree", treeDto).subscribe((res) => {
        // Przypisanie nowej nazwy lokalnie
        event.target.parentElement.parentElement.firstChild.textContent = name;
  
        // Utworzenie ikony
        const buttonIcon: HTMLParagraphElement = this.renderer.createElement('i');
  
        // Dodanie klas do ikony
        buttonIcon.classList.add('bi');
        buttonIcon.classList.add('bi-folder-fill');
        buttonIcon.classList.add('float-start');
        buttonIcon.classList.add('me-2');
  
        // Dodanie ikony tekstu
        event.target.parentElement.parentElement.firstChild.appendChild(buttonIcon);
      });
    }
  }

  deleteOnClick(event: any) {
    // Pobieranie elementu rodzica
    let parentID = event.target.parentElement.parentElement.parentElement.id;

    // Usuni??cie elemntu z drzewa
    this.http.delete("https://localhost:7052/api/Tree/" + parentID).subscribe(() => {
      // Pobranie elementu do usuni??cia
      let componentToRemove = (<HTMLInputElement>(document.getElementById(parentID)));
      
      // Usuni??cie elementu lokalnie
      componentToRemove.parentElement?.remove();
    });
  }

  sortOnClick(parentID: string) {
    // Pobranie elementu g????wnego kt??rego 'dzieci' b??d?? sortowane
    let rootComponent: any = (<HTMLInputElement>(document.getElementById(parentID)));
    
    // Tymczasowa lista
    let tmp = [];

    // Dodanie 'dzieci' do listy
    for (const child of rootComponent.children) {
      if (child.tagName == "UL")
      {
        tmp.push(child);
      }
    }
    
    // Odwr??cenie listy
    tmp.reverse();

    // Usuni??cie wszystkich dzieci z elementu g????wnego
    for (let index = 0; index < tmp.length; index++) {
      rootComponent.removeChild(rootComponent.lastChild);
    }

    // Dodanie posortowanych dzieci do elementu g????wnego
    tmp.forEach(element => {
      rootComponent.appendChild(element);
    });
  }

  expandLeafOnClick(event: any) {
    // Inicializacja zmiennej rodzica
    let liParentElement: any;
    
    // Sprawdzenie typu argumentu
    if (event.type == 'click')
    {
      liParentElement = event.target.parentElement.parentElement.parentElement;
    }
    else
    {
      liParentElement = event.parentElement.parentElement.parentElement;
    }
    
    // Wypisanie wszystkich 'dzieci' elementu
    for (const child of liParentElement.children) {
      if (child.tagName == "UL")
      {
        // Rekurencja
        this.expandLeafOnClick(child.firstChild.firstChild.lastChild.lastChild);

        // Pokazanie w??z??a
        child.firstChild.classList.remove("d-none");
      }
    }
  }

  dragStart(event: any) {
    // Pobranie danych przycisku
    let button = event.target;

    // Dodanie klasy drag do przycisku
    button.classList.add("drag");
  }

  dragStop(event: any) {
    // Pobranie danych przycisku
    let button = event.target;

    // Dodanie klasy drag do przycisku
    button.classList.remove("drag");

    // Pobranie parametr??w potrzebnych do Dto
    let treeID = event.target.parentElement.id;
    let name = event.target.textContent.replace("DodajZmie??Usu??Sortuj", "");
    let parentID = event.target.parentElement.parentElement.parentElement.id;
    
    // Dto
    let treeDto = {
      treeID: treeID,
      name: name,
      parentID: parentID
    }
    
    // Aktualizacja po??o??enie przycisku
    this.http.put("https://localhost:7052/api/Tree", treeDto).subscribe();
  }

  dragOver(event: any) {
    // Pobranie elementu drodzica klasy drag
    let dragButton = (<HTMLInputElement>(document.querySelector(".drag"))).parentElement;
    
    // Pobranie danych kontenera folderu
    let folderContainer = event.target.parentElement;
    
    // Wypisanie wszystkich element??w 'dzieci'
    for (const child of folderContainer.children) {
      // Sprawdzenie czy 'dzieci' folderu do kt??rego chcemy doda?? przycisk s?? widoczne
      if (child.tagName == "UL" && child.firstChild.classList.contains("d-none"))
      {
        // Je??eli nie s?? widoczne ukrywamy przycisk
        dragButton?.classList.add("d-none");
      }
      else
      {
        // Je??eli s?? widoczne to przycisk r??wnie?? pozostaje widoczny
        dragButton?.classList.remove("d-none");
      }
    }
    
    // Sprawdzenie czy przycisk doda si?? do elementu listy
    if (folderContainer.tagName == "LI")
    {
      // Dodanie przycisku do elementu listy
      folderContainer.appendChild(dragButton?.parentElement);
    }
  }
}
