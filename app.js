$(document).ready(function () {

	
	var submitQuestion = $(".submitQuestion");
	var responseButton = $(".responseButton");
	var createText = $(".createQuestion");
	var template = $(".template");

	var choices = [];

	createText.on("keypress", function(e) {
		if (e.which === 13) {
			submitQuestion.trigger("click");
		}
	})

	submitQuestion.on("click", function () {
		var value = createText.val();
		var length = choices.length;

		createQuestion(length, value, false);
		createText.val('');

		choices.push({
			"text": value,
			"isChecked": false,
			"votes": 0
		});

		localStorage.setItem("poll-results", JSON.stringify(choices));
	})

	responseButton.on("click", function () {
		loadchoices ();
		for (i = 0; i < choices.length; i++) {
			if (choices[i].isChecked) {
				choices[i].votes = choices[i].votes + 1;
			}
			choices[i].isChecked = false;
		}
		localStorage.setItem("poll-results", JSON.stringify(choices));
		$(".newOption").remove();
		loadchoices ();
		refreshchoices(choices);
	})

	var createQuestion = function (position, text, isChecked) {
		var question = template.clone()
						.addClass("newOption")
						.removeClass("template")

		question.find(".text").text(text);
		question.find(".checkbox").prop("checked", isChecked);
		question.data("position", position);

		question.appendTo(".poll");
	}

	var loadchoices = function () {
		if (localStorage.getItem("poll-results") != null) {
			choices = JSON.parse(localStorage.getItem("poll-results"));	
		}
	}

	var refreshchoices = function (stored) {
		if (localStorage.getItem("poll-results") != null) {
			for (i = 0; i < stored.length; i++) {
				createQuestion (i,
								stored[i].text, 
								stored[i].isChecked)
			}
		}
	}

	loadchoices ();
	refreshchoices(choices);

	$(document).on("change", ".checkbox", function () {
		var checked = $(this).is(':checked');
		var checkboxParent = $(this).parent(".newOption");
		var checkboxIndex = checkboxParent.data("position");
		
		choices[checkboxIndex].isChecked = checked;
		localStorage.setItem("poll-results", JSON.stringify(choices));
	})

	$(document).on("click", ".divDelete", function () {

		var choiceParent = $(this).parent(".newOption");
		var choiceIndex = choiceParent.data("position");
		choices.splice(choiceIndex, 1);

		localStorage.setItem("poll-results", JSON.stringify(choices));

		$(".newOption").remove();

		loadchoices ();
		refreshchoices(choices);

	})

})