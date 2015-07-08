
function Controller(obj_controller){
    
    var that = this,
        render;

    for (var prop in obj_controller){
        if (obj_controller.hasOwnProperty(prop) && typeof prop != 'function'){
            this[prop] = obj_controller[prop]
        };
    };

    render = this.render();

    this.init = (function(){
        $('#' + that.elementId).append(render);

        that.checkChanges();
        
        $('#' + that.elementId).delegate('button', 'click', function(){
            that.updateExams();
        });
    })();
}

Controller.prototype = {
    checkChanges: function(){
        setInterval($.proxy(function(){
            if (this.model.changed) {
                this.render();
                console.log(this.model.examsTaken);
                //console.log(this.model.changed);
                this.model.changed = false;
            }
        }, this), 100)
    },
};

// testing code

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