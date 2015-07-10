
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
        
        // насколько я понял, это и есть делегирование. Т.е. когда на родительский элемент вешается
        // слушатель, и потом, в зависимости от дочернего элемента, на который был произведён клик - 
        // уже вызывается соответствующая функция для обработки евента для конкретного дочернего элемента.
        
        $('#' + that.elementId).delegate('button', 'click', function(event){
            event.stopImmediatePropagation();
            //console.log($(event.target).attr('id'));
            for (var prop in that.clickHandlers){
                if (prop === '#' + $(event.target).attr('id')) {
                    that[that.clickHandlers[prop]](); // вызывется updateExams функция
                }                
            }
        });
        
        // кусок кода из первого коммита. Сказали переделать через делегирование.
        
        /*
        for (var prop in that.clickHandlers){
-            if (that.clickHandlers[prop] in that){
-                $(prop).on('click', function(){ 
-                    that.updateExams();
-                });
-            };
-        };
        */
    })();
}

Controller.prototype = {
    checkChanges: function(){
        setInterval($.proxy(function(){
            if (this.model.changed) {
                // уверен, что не лучший вариант выполнения задачи, но работает :)
                $('#' + this.elementId).empty();
                $('#' + this.elementId).append(this.render());
                $('#' + this.elementId).append('<span>examsTaken: ' + this.model.examsTaken + '</span>');
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