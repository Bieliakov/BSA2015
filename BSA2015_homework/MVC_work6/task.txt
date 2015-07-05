Реализовать паттерн MVC/MVP путем реализации сущностей Model и Controller/Presenter. View представлена в виде html. Model хранит данные и методы их обработки, а Controller - обрабатывает события от пользователя и рендерит view.

Таким образом, в результате следующий код должен работать, как ожидается:

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
    }
});
Следовательно, Model не имеет какой-то специальной логики, по сути является просто объектом. Controller же вставляет результат функции render в найденный элемент с id из свойства elementId. Render вызывается при создании Controller. Также необходимо реализовать метод сущности Controller, который каждые 100мс будет проверять this.model.changed и, если оно равно true, вызывать метод render, а changed возвращать в false. (Это крайне отвратительная практика, но вам пока пригодится для понимания того, что будет дальше) Значения объекта clickHandlers являются методами Controller, которые будут вызваны в случае, если пользователь кликает по элементу-ключу для текущего значения.