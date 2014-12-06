$(document).ready(function () {

	
	var submitQuestion = $(".submitQuestion");
	var createText = $(".createQuestion");
	var template = $(".template");

	var options = [];


	submitQuestion.on("submit", function(e) {
		e.preventDefault();
	})

	createText.on("keypress", function(e) {
		if (e.which === 13) {
			submitQuestion.trigger("click");
		}
	})

	submitQuestion.on("click", function () {
		var value = createText.val().toLowerCase();
		var length = options.length;

		createQuestion(length, value, false);
		createText.val('');

		options.push({
			"text": value,
			"isChecked": false
		});

		localStorage.setItem("poll-results", JSON.stringify(options));
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

	var loadOptions = function () {
		if (localStorage.getItem("poll-results") != null) {
			options = JSON.parse(localStorage.getItem("poll-results"));	
		}
	}

	var refreshOptions = function (stored) {
		if (localStorage.getItem("poll-results") != null) {
			for (i = 0; i < stored.length; i++) {
				createQuestion (i,
								stored[i].text, 
								stored[i].isChecked)
			}
		}
	}

	loadOptions ();
	refreshOptions(options);

	$(document).on("change", ".checkbox", function () {
		var checked = $(this).is(':checked');
		var checkboxParent = $(this).parent(".newOption");
		var checkboxIndex = checkboxParent.data("position");
		
		options[checkboxIndex].isChecked = checked;
		localStorage.setItem("poll-results", JSON.stringify(options));
	})
	
	// removeQuestion function
	// resetQuestions function

})