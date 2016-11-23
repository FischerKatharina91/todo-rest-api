var todo = todo || {};
var data = data || {};

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

        $.get("phpbackend/index.php",
		{getAll : "getTodoList"}, 
		function(phpdata){
			if(phpdata!=""){
				data = JSON.parse(phpdata);
				$.each(data, function (index, params) {
					generateElement(params);
				});
			}
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
		$.post(
            'phpbackend/index.php',
            {remove: paramsid}
        );
        
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
		data = {};
        tempData = {
            id: id,
            code: "1",
            title: title,
            date: date,
            description: description
        };
        data[id] = tempData;
		
		$.post(
            'phpbackend/index.php',
            { add: JSON.stringify(data)}
        );
		
        generateElement(tempData);
        inputs[0].value = "";
        inputs[1].value = "";
        inputs[2].value = "";
        $('#changeOverlay').css('display', 'none');
    };

    todo.clear = function () {
        $.post(
            'phpbackend/index.php',
            {clear: true}
        );
        
        $("." + defaults.todoTask).remove();
    };

})(todo, data, jQuery);