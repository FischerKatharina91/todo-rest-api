var todo = todo || {},
        data = JSON.parse(localStorage.getItem("todoDaten"));

data = data || {};

var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();
var heute = d + '.' + m + '.' + y;

(function (todo, data, $) {

    var defaults = {
        todoTask: "todo-task",
        todoHeader: "task-header",
        todoDate: "task-date",
        todoDescription: "task-description",
        taskId: "task-",
        formClass: "todo-form",
        dataAttribute: "data"
    }, codes = {
        "1": "#todo-list"
    };

    todo.init = function (options) {

        options = options || {};
        options = $.extend({}, defaults, options);

        $.each(data, function (index, params) {
            generateElement(params);
        });
    };

    // Todo hinzufügen
    var generateElement = function (params) {
        var parent = $(codes[params.code]),
                wrapper;

        if (!parent) {
            return;
        }

        wrapper = $("<div />", {
            "class": defaults.todoTask,
            "id": defaults.taskId + params.id,
            "data": params.id
        }).appendTo(parent);

        $("<div />", {
            "class": defaults.todoHeader,
            "text": params.title
        }).appendTo(wrapper);

        $("<div />", {
            "class": defaults.todoDescription,
            "text": params.description
        }).appendTo(wrapper);

        $("<div />", {
            "class": defaults.todoDate,
            "text": 'Erstellungsdatum: ' + heute
        }).appendTo(wrapper);

        $("<button />", {
            "class": 'remove',
            "text": 'Löschen',
            "onclick": 'todo.removeElement('+params.id+')'
        }).appendTo(wrapper);

        $("<button />", {
            "class": 'change',
            "text": 'Ändern',
            "onclick": 'todo.changeElement("'+params.id+'","'+params.title+'","'+params.description+'","'+heute+'")'
        }).appendTo(wrapper);
    };
    
    // Todo löschen
    todo.removeElement = function (paramsid) {
        data = {};
        localStorage.setItem("todoDaten", JSON.stringify(data));
        $("#" + defaults.taskId + paramsid).remove();
    };
    
    //Todo ändern
    todo.changeElement = function (id, betreff, beschreibung, date) {
       $('#betreff').val(betreff);
       $('#beschreibung').val(beschreibung);
       $('#date').val(date);
       todo.removeElement(id);
    };

    todo.add = function () {
        var inputs = $("." + defaults.formClass + " :input"),
                id, title, description, date, tempData;

        title = inputs[0].value;
        description = inputs[1].value;
        date = inputs[2].value;

        id = new Date().getTime();

        tempData = {
            id: id,
            code: "1",
            title: title,
            date: date,
            description: description
        };
        data[id] = tempData;
        localStorage.setItem("todoDaten", JSON.stringify(data));
        generateElement(tempData);
        inputs[0].value = "";
        inputs[1].value = "";
        inputs[2].value = "";
        $('#changeOverlay').css('display', 'none');
    };

    todo.clear = function () {
        data = {};
        localStorage.setItem("todoDaten", JSON.stringify(data));
        $("." + defaults.todoTask).remove();
    };

})(todo, data, jQuery);