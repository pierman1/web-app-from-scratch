# Opdracht 5

Opdracht 5 van het vak Web App From Scratch. Maak een Single Page web-app.

link: https://pierman1.github.io/web-app-from-scratch/spa/index.html#best-practices

short Url: http://goo.gl/WwfA55


## Week 1: Aantekeningen.

- *Object: An object is a collection of properties, and a property is an association between a name (or key) and a value. A property's value can be a function, in which case the property is known as a method.* 

- *Method: een functie in een object*

- *Property: een eigenschap van een object*

- *This: verwijst naar het object wat ervoor*

- *Scope: geeft aan in welke functie je zit, waar is student 1 beschikbaar.*

- *Context: welke informatie is beschikbaar in deze context*

**Object**

```
var student = {
    name: 'egbert'
};
```

**Method**

```
var student = [
    {
        name: 'egbert',
        generateMyInfo: function() {
         console.log(this.name);
        }
    }
];
```

**Property**

```
name: 'egbert',
```

**This**

```
this.name 
```

Used strict `"use strict";` zorgt ervoor dat je in 'strict mode' aan het werk bent,
dus bijvoorbeeld dat je geen ongedifineerde variabelen kan gebruiken.

**Immediately-Invoked Function Expression (IIFE)**
```
(function () {
   
})();
```
Waarom IIFE gebruiken? 

## Live coding - Laurens

- http://codepen.io/Razpudding/pen/XpBbXa?editors=1010

## Bronnen

- http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/
- http://benalman.com/news/2010/11/immediately-invoked-function-expression/

# Voor- en nadelen JavaScript libraries/frameworks

Voordelen

- stabiel 
- gestructureerd
- minder werk, bv. cross-browser compatibility, namespaces en core functions

http://www.noupe.com/development/javascript-frameworks-94897.html

## Aantekeningen les 2

**Object literal pattern**

// functie scope
(function () {
 var person = {
    // property
    name: 'jane doe',
    //method
    speak: function () {
        console.log('Hello, my name is' + this.name);
    }
    
    
)

**Global Scope**

Window = Object

in Node.js

Object

**Function scope**, alles wat hierin gedefinieerd is kan alleen binnen deze scope bereikt worden.


