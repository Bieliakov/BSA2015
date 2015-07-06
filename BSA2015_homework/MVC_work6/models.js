function Model(obj){
    for (var prop in obj){
        if (obj.hasOwnProperty(prop) && typeof prop != 'function'){
            this[prop] = obj[prop]
        }
    }
    return this;
}

// works without it
/* 
Model.prototype.takeExam = function (){
    this.examsTaken++;
    this.changed = true;
}
*/
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
console.log(Student)
*/