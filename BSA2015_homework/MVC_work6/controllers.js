
function Controller(obj_controller){
    
    var that = this,
        render;

    for (var prop in obj_controller){
        //console.log(prop, obj_controller[prop])
        if (obj_controller.hasOwnProperty(prop) && typeof prop != 'function'){
            this[prop] = obj_controller[prop]
            //console.log(this[prop])
        };
    };

    render = this.render();
    
    this.checkChanges = function(){
        setInterval($.proxy(function(){
            if (this.model.changed) {
                //console.log(this)
                //console.log('CHANGED!');
                console.log(this.model.examsTaken)
                this.model.changed = false;
            }
        }, this), 100)
    };
    
    this.init = function(){
        $('#' + that.elementId).append(render);

        that.checkChanges();

        for (var prop in that.clickHandlers){
            
            //console.log('prop', prop);
            //console.log('this',StudentController)
            //console.log('StudentController.clickHandlers', StudentController.clickHandlers);
            //console.log('StudentController.clickHandlers[prop]', StudentController.clickHandlers[prop])
            //console.log($(prop))
            if (that.clickHandlers[prop] in that){
                $(prop).on('click', function(){ 
                    //console.log('before', Student.changed)
                    that.updateExams()
                    //console.log(Student.examsTaken)
                    //console.log('after',Student.changed)
                });
            }
        }
    };

    return this;
}
/*
Controller.prototype = {
   render: function(){
        //console.log(this);
        return '<span>' + this.model.name + '</span><button id="student-exams-button">Increase exams taken</button>';
    },
    updateExams: function(){
        this.model.takeExam();
        
    },
    
};
*/

var StudentController = new Controller({
    model: Student,
    elementId: 'student-container',
    render: function(){
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


StudentController.init();

/*
StudentController.updateExams();
console.log(Student.examsTaken)
console.log(StudentController.model.name)
*/


for (var prop in StudentController){
    console.log(prop)
}
/**/