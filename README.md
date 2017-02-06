# Web-App-from-scratch

## Week 1: Aantekeningen.

- *Object:* 

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


