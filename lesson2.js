
// Object literal pattern
(function () {
    var person = {
        name: 'jane doe',
        speak: function () {
            console.log('Hello, my name is' + this.name);
        }
    }

    console.log(person);
    person.speak();

})();

// Module pattern
var anotherPerson = (function () {
    var _name = 'John Doe';

    var speak = function () {
        console.log('Hello, my name is' + this.name);
    };

    return {
        name: _name,
        speak: speak
    };
})();

console.log(anotherPerson);
anotherPerson.speak();

// Object Constructor

(function () {
    var Person = function (name, sport) {
        this.name = name;
        this.sport = sport;

        this.speak = function () {
            console.log('Hello, my name is' + this.name);
        }
    }

    Person.prototype.speakLoud = function () {
        console.log(('Hello, wmy name is' + this.name))
    }

    var jane = new Person('Jane Doe');
    var john = new Person('John Doe');

    console.log(Person);
    console.log(jane);
    console.log(john.sport);
})();


viewConstructor
moduleConsturctor
