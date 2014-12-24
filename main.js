"use strict";

$(function(){
	//COMPLETED this function adds a list
	$(document).on("click", "#addList", function(){
		var number = $("#myLists li").length;
		console.log("I have been clicked");
		var value = $(".form-control").val();
		console.log(value);
		var newList = document.createElement("LI");
		newList.setAttribute("role", "presentation");
		newList.setAttribute("data-target", "pill");
		$(newList).html("<a href = '#'>" + value + "</a>");
		document.getElementById("myLists").appendChild(newList);
		console.log($(".form-control").val());
		$("#sidebar .form-control").val('');
		$("#sidebar .form-control").attr("placeholder", "Add A List");
		//var last = document.getElementById("myLists");
		//document.getElementById("myLists").insertBefore(newList, last.childNodes[last.childNodes.length-2]);

	//COMPLETED this creates a new div and empty page + button for the new list
		var newContainer = document.createElement("DIV");
		newContainer.className = "tab-pane"
		newContainer.setAttribute("role", "tabpanel");
		newContainer.setAttribute("id", "id" + number);
		document.getElementById("allItems").appendChild(newContainer);

		var newDiv = document.createElement("DIV");
		newDiv.className = "input-group";
		$(newDiv).html("<div class='well well-sm'>You don't have any items!</div>");
		newContainer.appendChild(newDiv);

	//COMPLETED adds the new list to the modal
		var old = $(".list-group").html();
		$(".list-group").html(old + "<a href='#' class='list-group-item'>" + value + "</a>");
	});
	

	//COMPLETED Changes the active state of the nav and content
	$(document).on("click", "#myLists", function(event){
		console.log($(event.target).parent().text());
		console.log($(event.target).parent());
		$(event.target).parent().addClass("active").siblings().removeClass("active");
		$("#allItems .active").removeClass("active");
		//var replacement = $(event.target).parent().text();
		var replacement = $("li").index($(event.target).parent());
		document.getElementById("id" + replacement).className = "tab-pane active";
		$(".row p").html($(event.target).parent().text() + " Items");
	});

	//COMPLETED this function appends a new list item to the existing list
	$("#addItem").click(function (){
		console.log("ohhey");

		var newItemDiv = document.createElement("DIV");
		newItemDiv.className = "input-group";
		var thisId = $("#allItems .active").attr("id");
		document.getElementById(thisId).appendChild(newItemDiv);
		
		var newBox = document.createElement("SPAN");
		newBox.className = "input-group-addon";
		
		var newCheck = document.createElement("INPUT");
		newCheck.setAttribute("type", "checkbox");
		newCheck.className = "chkbx";
		newItemDiv.appendChild(newBox);
		newBox.appendChild(newCheck);
		
		var newItem = document.createElement("INPUT");
		newItem.setAttribute("type", "text");
		newItem.setAttribute("placeholder", "Input To Do Item");
		newItem.className = "form-control";
		newItemDiv.appendChild(newItem);
		
		var newTrash = document.createElement("SPAN");
		newTrash.className = "input-group-btn";
		newItemDiv.appendChild(newTrash);
		
		var newButton = document.createElement("BUTTON");
		newButton.className = "btn btn-default trash";
		newButton.setAttribute("type", "button");
		newTrash.appendChild(newButton);
		
		var newIcon = document.createElement("SPAN");
		newIcon.className = "glyphicon glyphicon-trash trash-icon";
		newButton.appendChild(newIcon);
		//console.log($("[class|=chkbx]"));

		//COMPLETED remove the well when there is text added
		if ($("#allItems .active :contains('You have no items!')")) {
			$("#allItems .active .well").hide();
		}
	});

	var n = 0

	//COMPLETED da check off box and check off counter (does not count back when unchecked)
	$(document).on("click", ".chkbx", function(event){
		if ($(event.target).is(":checked")) {
			$(event.target).parent().next().prop("readonly", true);
			n = n + 1;
			$(".page-header").html("<h1> To Do List <small>" + n + " items completed</small><h1>");
		} else {
			$(event.target).parent().next().prop("readonly", false);
		}
	});

	//COMPLETED da trash
	$(document).on("click", ".trash", function(event){
		console.log("trash");
		$(event.target).parent().parent().remove();
	});

	$(document).on("click", ".trash-icon", function(event){
		console.log("icon");
		$(event.target).parent().parent().parent().remove();
	});

	//COMPLETED can sort the lists
	$("#myLists").sortable();
	$("#myLists").disableSelection();
	//COMPLETED can sort the items
	$(".tab-pane").sortable();
	$(".tab-pane").disableSelection();


	//COMPLETED Switches the states in the modal
	$(document).on("click", ".modal-body", function(event){
		$(event.target).addClass("active").siblings().removeClass("active");
		//var deleted = $(event.target).text();
	});

	//COMPLETEE deletes list and switches active lists
	$(document).on("click", "#delete", function(event){
		var deleted = $(".list-group .active").text();
		var position = $(".list-group .active").index();
		$("#myLists li").remove("li:contains(" + deleted + ")");
		$(".list-group .active").remove();
		$("#id"+ position).remove();
		if (position > 0) {
			position = position - 1;
			$("#myLists li:eq(" + position + ")").addClass("active");
			document.getElementById("id" + position).className = "tab-pane active";
			$(".row p").html($("#myLists li:eq(" + position + ")").text() + " Items");
		} else if (position == 0) {
			$("#myLists li:first").addClass("active")
			$("#allItems div:first").addClass("active")
			$(".row p").html($("#myLists li:first").text() + " Items");
		}
	});
		
});

var button = document.getElementById("addItem");
button.addEventListener("addItem",onclick,false);


