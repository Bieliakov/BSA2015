function Man(name, age){
    this.name = name;
    this.age = age;
    return this;
};

Man.prototype.live = function(){
    return console.log(this.name,"has been living for", this.age, 'years.');
};

function Student(name, age){
    Man.apply(this, arguments);
    return this;
};

Student.prototype = new Man();
Student.prototype.constructor = Student;
Student.prototype.study = function(){
    console.log("Yes, I'm a real hardworker :)");
};

function Professor(name, age, university, degree){
    this.name = name;
    this.age = age;
    this.university = university;
    this.degree = degree;
    return this;
};
Professor.prototype = new Man();
Professor.prototype.constructor = Professor;

Professor.prototype.rest = function(){
    console.log(this.name,"is resting now.");
};
Professor.prototype.teach = function(){
    return console.log(this.name,"is teaching.");
};
Professor.prototype.introduce = function(){
    return console.log(this.name,"tells that he has a", this.degree, 'and he is a professor at the', this.university);
};

function duckType(){
    var clazz = this.constructor.toString(); // variable for class identification
    if ('study' in this && typeof this.study === 'function') {
        return clazz.slice(9 , clazz.indexOf('('));
    } else if ('live' in this && typeof this.live === 'function'){
        return clazz.slice(9 , clazz.indexOf('('));
    }
};
