# Web-App-from-scratch

Hier zijn mijn werkzaamheden en aantekingen van het vak WAFS.

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
   // your code
})();
```
Waarom IIFE gebruiken? 

## Live coding - Laurens

- http://codepen.io/Razpudding/pen/XpBbXa?editors=1010

## Bronnen

- http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/
- http://benalman.com/news/2010/11/immediately-invoked-function-expression/