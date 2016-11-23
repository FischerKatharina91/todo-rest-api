<?php

if (isset($_GET['getAll'])) {
    getTodoList();
} elseif (isset($_GET['get'])) {
    getTodo($_POST['get']);
} elseif (isset($_POST['add'])) {
    addTodo($_POST['add']);
} elseif (isset($_POST['remove'])) {
    removeTodo($_POST['remove']);
} elseif (isset($_POST['clear'])) {
    removeAllTodos();
} elseif (isset($_POST['change'])) {
    changeTodo();
};

//Ausgabe der ganzen Todoliste als JSON
function getTodoList() {
    $json = file_get_contents('..\todolist.json');
    echo $json;
    return;
}

;

//Ausgabe eines Todo-Eintrags anhand der ID
function getTodo($id) {
    $json = file_get_contents('..\todolist.json');
    $json = json_decode($json, true);
    if ($json == null) {
        $json = array();
    }

    foreach ($json as $key => $val) {
        if (in_array($id, $val)) {
            return $json[$key];
        }
    }
}

;

//Hinzug�gen eines Todo-Eintrags
function addTodo($data) {
    $data = json_decode($data, true);
    $json = file_get_contents('..\todolist.json');
    $json = json_decode($json, true);
    if ($json == null) {
        $json = array();
    }
    $mergedArray = array_merge($data, $json);
    file_put_contents('..\todolist.json', json_encode($mergedArray));
    echo("Todo erfolgreich gespeichert!");
    return;
}

;

//L�schen eines Todo-Eintrags anhang der ID
function removeTodo($id) {
    $json = file_get_contents('..\todolist.json');
    $json = json_decode($json, true);
    if ($json == null) {
        $json = array();
    }

    foreach ($json as $key => $val) {
        if (in_array($id, $val)) {
            unset($json[$key]);
            file_put_contents('..\todolist.json', json_encode($json));
            echo("Todo erfolgreich gelöscht!");
            return;
        }
    }
    echo("Todo konnte nich gelöscht werden!");
    return;
}

;

//L�schen alles Todos
function removeAllTodos() {
    file_put_contents('..\todolist.json', "");
    echo("Alle Todos erfolgreich gelöscht!");
    return;
}

;

//�ndern eines Todo-Eintrags anhand der ID
function changeTodo($id, $data) {
    removeTodo($id);
    addTodo($data);
}

;
?>