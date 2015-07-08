function Model(obj){
    for (var prop in obj){
        if (obj.hasOwnProperty(prop) && typeof prop != 'function'){
            this[prop] = obj[prop]
        }
    }
    return this;
}

// testing code


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
/**/
