
function Controller(obj){
    this.model = obj.model;
    this.elementId = obj.elementId;
    this.clickHandlers = obj.clickHandlers;
    console.log(obj.model)
}

Controller.prototype = {
    render: function(){
        //console.log(this);
        return '<span>' + this.model.name + '</span><button id="student-exams-button">Increase exams taken</button>';
    },
    updateExams: function(){
        this.model.takeExam();
        
    },
    checkChanges: function(){
        setInterval($.proxy(function(){
            if (this.model.changed) {
                StudentController.render();
                console.log('CHANGED!');
                this.model.changed = false;
            }
        }, this), 100)
    },
};


var StudentController = new Controller({
    model: Student,
    elementId: 'student-container',
    render: function(){
        //console.log(this);
        return '<span>' + this.model.name + '</span><button id="student-exams-button">Increase exams taken</button>';
    },
    clickHandlers: {
        '#student-exams-button': 'updateExams'
    },
    updateExams: function(){
        this.model.takeExam();
    },

});

/**/

var init = (function(){
    $('#' + StudentController.elementId).append(StudentController.render());

    StudentController.checkChanges();
    for (var prop in StudentController.clickHandlers){
        
        //console.log('prop', prop);
        //console.log('this',StudentController)
        //console.log('StudentController.clickHandlers', StudentController.clickHandlers);
        console.log('StudentController.clickHandlers[prop]', StudentController.clickHandlers[prop])
        console.log($(prop))
        if (StudentController.clickHandlers[prop] in StudentController){
            $(prop).on('click', function(){ 
                console.log('before', Student.changed)
                StudentController.updateExams()
                console.log(Student.examsTaken)
                console.log('after',Student.changed)
            });
        }
    }
})();


/*
StudentController.updateExams();
console.log(Student.examsTaken)
console.log(StudentController.model.name)
*/

/*
for (var prop in StudentController){
    console.log(prop)
}
*/