
function Controller(obj_controller){
    
    var that = this;

    for (var prop in obj_controller){
        if (obj_controller.hasOwnProperty(prop) && typeof prop != 'function'){
            this[prop] = obj_controller[prop]
        };
    };

    this.init = (function(){
        
        $('#' + that.elementId).append(that.render());

        that.checkChanges();
        
        $('#' + that.elementId).delegate('button', 'click', function(event){
            event.stopImmediatePropagation();
            //console.log($(event.target).attr('id'));

            for (var prop in that.clickHandlers){
                if (prop === '#' + $(event.target).attr('id')) {
                    //console.log(that.clickHandlers[prop]); 
                    that[that.clickHandlers[prop]](); // invokes updateExams function in our example
                }                
            }
        });
    })();
}

Controller.prototype = {
    checkChanges: function(){
        setInterval($.proxy(function(){
            if (this.model.changed) {
                $('#' + this.elementId).empty();
                $('#' + this.elementId).append(this.render());
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
        return '<span>' + this.model.name + '</span><button id="student-exams-button">Increase exams taken</button>' +
        '<span>' + this.model.examsTaken + '</span>'; // added for visualization
    },
    clickHandlers: {
        '#student-exams-button': 'updateExams'
    },
    updateExams: function(){
        this.model.takeExam();
    },

});
/**/