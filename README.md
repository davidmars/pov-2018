# pov-2018
work in progress

## pov.jquery.more

### POV only
Méthodes dépendantes du framework PHP

#### $(element).povRefresh(cb);
Permet de rafraichir le code html d'un élément.

L'attribut `data-pov-v-path` est obligatoire, il permet de savoir quelle vue charger.
L'attribut `data-pov-v-uid` est optionel, il permet d'envoyer le paramètre `uid` qui sera réceptionné par la controlleur PHP `PovApi/getView`.

```HTML
<div data-pov-v-path="path-de/ma-vue" data-pov-vv-uid="uid-optionnel">
    Mon machin
</div>
```

** Attention**
Si l'élément qu'on souhaite rafraichir a un champ texte et que cet élément a le focus,
alors le template ne sera rafraichit qu'une fois le focus retiré. 
Cette règle ergonomique évite qu'un utilisateur ne perde le focus quand il saisit du texte.


### Utilitaires
Méthodes sans icidences directes sur le framework.

#### $(element).removeClassPrefix('color-')
Per met de supprimer toutes les classes css qui commencenet par "color-"


#### $(element).isInViewport() Savoir si un $element est visible dans l'écran

Pratique pour optimiser les grosses interfaces DOM

```javascript
if($(element).isInViewport()){
    $(element).addClass("affiche-moi")
}else{
    $(element).removeClass("affiche-moi")
}
```
##### Exemple concrêt

Les exemples de codes suivants permettent de masquer les éléments DOM .visible-in-viewport

###### HTML
```html
<div class="visible-in-viewport">
    <div>Lot of stuff hard to display</div>
</div>
```

###### Less CSS
```less
.visible-in-viewport:not(.in-viewport){
    min-height: 50px;
    min-width: 50px;
    *{
      display: none;
    }
}
.visible-in-viewport.in-viewport{
  //display par défaut si dans le viewport
}
```
###### Javascript
```javascript
/**
 * ajoute ou enlève la classe .in-viewport sur les éléments .visible-in-viewport
 */
function visibleInViewport(){
    $('.visible-in-viewport').each(function() {
        if ($(this).isInViewport()) {
            $(this).addClass("in-viewport")
        } else {
            $(this).removeClass("in-viewport")
        }
    });
}

//écouteurs DOM

//tous les éléments
$("*").on('scroll', function() {
    visibleInViewport();
});

//la fenêtre
$(window).on('resize scroll', function() {
    visibleInViewport();
});
```
