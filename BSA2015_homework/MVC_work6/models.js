/**/
function Model(obj){
    this.name = obj.name;
    this.age = obj.age;
    this.year = obj.year;
    this.examsTaken = obj.examsTaken;
    this.age = obj.age;
    this.changed = false;
}

/*
function Model(obj){
    
    
    for (var prop in obj){

        if (obj.hasOwnProperty(prop) && typeof prop != 'function'){

            this.prop = obj[prop]
        }
        console.log(prop)
        console.log(this.prop)
    }
    console.log(obj.constructor())
    console.log(this)
    return this;
}
*/

Model.prototype.takeExam = function (){
    this.examsTaken++;
    this.changed = true;
    
}

// test case


var Student = new Model({
    name: 'Piotr',
    age: 22,
    year: 5,
    examsTaken: 2,
    takeExam: function(){
        this.examsTaken++;
        this.changed = true;
    }
});
/*
for (var prop in Student){
    console.log(prop, ':', Student[prop])
}

*/