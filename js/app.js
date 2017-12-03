// thi storage will be used for storing todo list data

if(typeof sessionStorage["todolist"] === "undefined") {
	sessionStorage["todolist"] = "[]";	
}

if(typeof sessionStorage.doneList === "undefined") {
	sessionStorage.doneList = "[]";
}

//sessionStorage.todolist = null;

function getFromSession(sessionName) {
	switch(sessionName){
		case "todolist":
			return JSON.parse(sessionStorage["todolist"]);
		break;

		case "donelist":
			return JSON.parse(sessionStorage["doneList"]);
		break;
	}
}

function setToSession(dataArray, sessionName) {
	switch (sessionName) {
		case "todolist":
			sessionStorage["todolist"] = JSON.stringify(dataArray);			
		break;
		case "donelist": 
			sessionStorage["doneList"] = JSON.stringify(dataArray);			
		break;
	}
	
}

function moveItemToDoneListFromToDoList(index) {
	var todoData = getFromSession("todolist");
	var doneData = getFromSession("donelist");
	doneData.push(todoData[index]);
	setToSession(doneData,"donelist");
	todoData.splice(index, 1);
	setToSession(todoData,"todolist");
	display();
}

function assignClickEvent() {
	$("table input[type='checkbox']").unbind("change");
	$("table input[type='checkbox']").change(function() {
		if($(this).val()){
			moveItemToDoneListFromToDoList($(this).data("index"));
		}
	});
}

function displayToDoList() {

	var todoData = getFromSession("todolist");
    var finalTemplate = "";
    var index;
    
    for(index = 0; index<todoData.length; index++) {
    	finalTemplate = finalTemplate + `<tr> 
        		<td align="left" valign="top" style="padding: 5px;">${index+1}</td>
        		<td align="left" valign="top" style="padding: 5px;">${todoData[index].toDoTitle}</td>
        		<td align="left" valign="top" style="padding: 5px;">${todoData[index].toDoDescription}</td>
        		<td align="left" valign="top" style="padding: 5px;">
        			<input type="checkbox" data-index="${index}" name="">
        		</td>
        	</tr>`;
    }

    $("#table_todoList").html(finalTemplate);
    assignClickEvent();

    if(todoData.length) {
    	$("#p_nothingToShowInToDo").hide();	
    } else {
    	$("#p_nothingToShowInToDo").show();	
    }
}

// this function displays the done list
function displayDoneList() {

	var doneData = getFromSession("donelist");
    var finalTemplate = "";
    var index;
    
    for(index = 0; index<doneData.length; index++) {
    	finalTemplate = finalTemplate + `<tr> 
        		<td align="left" valign="top" style="padding: 5px;">${index+1}</td>
        		<td align="left" valign="top" style="padding: 5px;">${doneData[index].toDoTitle}</td>
        		<td align="left" valign="top" style="padding: 5px;">${doneData[index].toDoDescription}</td>
        		<!--<td align="left" valign="top" style="padding: 5px;">
        			<input type="checkbox" name="">
        		</td>-->
        	</tr>`;
    }

    $("#table_doneList").html(finalTemplate);

    if(doneData.length) {
    	$("#p_nothingToShowInDone").hide();	
    } else {
    	$("#p_nothingToShowInDone").show();	
    }
}

function display(){
	displayToDoList();
	displayDoneList();
}

function storeToDoInformation(title, description) {
	var toDoObject = {};
	toDoObject.toDoTitle = title;
	toDoObject.toDoDescription = description;
	toDoObject.isDone = false;
	toDoObject.comments = [];
	toDoData = getFromSession("todolist");
	toDoData.push(toDoObject);
	setToSession(toDoData, "todolist");
	display();
}

$(document).ready(function() {
	display();
	$("#submit").click(function() {
		
		var title = $("#txt_title").val().trim();
		var description =  $("#txt_description").val().trim();

		if(title !== "" && description !== "") {
			storeToDoInformation(title, description);
		} else {
			alert("Give title and description both then submit");
		}
	});
});