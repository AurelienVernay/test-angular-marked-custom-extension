import { Component, inject, Injector, model, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { marked } from 'marked';

import { customIdExtension } from './custom-id.plugin';
import { CustomId } from './custom-id/custom-id';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  // viewchild of markdown container 
  @ViewChild('markdownContainer', { read: ViewContainerRef })
  vcr!: ViewContainerRef;

  // we need injector to inject dynamically component
  private injector = inject(Injector);

  // test tag with misc markdown values
  protected inputValue = model<string>(`# Titre niveau 1

## Titre niveau 2

### Titre niveau 3

---

## Mise en forme du texte

- Texte en **gras**
- Texte en *italique*
- Texte en ***gras + italique***
- Texte <u>souligné</u> (via HTML)
- Texte ~~barré~~
- \`code inline\`

> Ceci est une citation  
> sur plusieurs lignes.

---

## Bloc de code

\`\`\`ts
function hello(name: string): string {
  return \`Hello \${name}!\`;
}
\`\`\`

## Liste à puces
- Élément A
- Élément B
  - Sous-élément B.1
  - Sous-élément B.2
    - Sous-sous-élément
- Élément C
test balise custom [ID0]
## Liste numérotée
1. Premier élément
2. Deuxième élément
3. Troisième élément
   1. Sous-élément 3.1
   2. Sous-élément 3.2

## Liste mixte
- Point principal
  1. Étape 1
  2. Étape 2
- Autre point
  - Détail A
  - Détail B

## Liste de tâches
- [x] Tâche terminée
- [ ] Tâche en cours
- [ ] Tâche à faire


## Exemple de tableau

| Nom        | Âge | Profession      | Statut      |
|-----------|----:|----------------|------------|
| Alice     |  30 | Développeur    | Actif      |
| Bob       |  25 | Designer       | Inactif    |
| Charlie   |  35 | Product Owner  | Actif      |
| Denise    |  28 | Testeur QA     | En formation |

### Alignements possibles

| Gauche   | Centre   | Droite  |
|:---------|:--------:|--------:|
| Texte    | Texte    | Texte   |
| Exemple  | Exemple  | Exemple |
| Aligné   | Aligné   | Aligné  |

### Avec mise en forme

| Nom        | Notes                   | Remarques          |
|-----------|------------------------|------------------|
| Alice     | **95**                  | Très bon travail  |
| Bob       | *88*                    | Bonne progression |
| Charlie   | \`100\`                   | Excellent         |
| Denise    | ~~60~~                   | À améliorer       |
`);

  ngOnInit(): void {
    // inject marked extension to parse [ID0] into custom html tags
    marked.use(customIdExtension);
  }

  // launch manual parse
  parseManually() {

    // parse markdown into HTML
    const html = marked.parse(this.inputValue(), {
      async: false, gfm: true, breaks: true,
    });
    // we need a DOMParser to parse HTML string into DOMTree
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // insert whole HTML inside container element
    this.vcr.element.nativeElement.innerHTML = doc.body.innerHTML;

    // we use query selector to fetch custom tag & handle them individually
    doc.querySelectorAll('custom-id').forEach(el => {
      const id = el.getAttribute('id');

      // create a ComponentRef using ViewContainerRef using provided injector
      const compRef = this.vcr.createComponent(CustomId, { injector: this.injector });
      // for now i only injected id inside extension, but here we could inject much more inputs !
      compRef.setInput('id', id);

      //retrieve element & replace it by our created component
      const placeholder = this.vcr.element.nativeElement.querySelector(`custom-id[id="${id}"]`);
      placeholder.replaceWith(compRef.location.nativeElement);
    });
  }
}
