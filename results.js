
google.load("visualization", "1", {packages:["corechart"]});

$(document).ready(function () {

	var template2 = $(".template2");
	var choices = [];
	var total;

	var loadResults = function () {
		if (localStorage.getItem("poll-results") != null) {
			choices = JSON.parse(localStorage.getItem("poll-results"));
		}
	}

	var refreshResults = function (array) {
		if (localStorage.getItem("poll-results") != null) {
			calcTotal (choices);
			for (i = 0; i < array.length; i++) {
				createBar (array[i].text, 
						array[i].votes,
						total);
			}
		}
	}

	var calcTotal = function (array) {
		total = 0
			for (i = 0; i < array.length; i++) {
				total = total + array[i].votes;
			}
	}

	var createBar = function (text, votes, maximum) {
		var progress = template2.clone()
						.addClass("progressBar")
						.removeClass("template2")

		var votesText = "" + votes + " votes"

		progress.find(".question").text(text);
		progress.find(".vote").text(votesText);
		progress.find(".meter").attr({
							min: 0,
							value: votes,
							max: maximum,
						});

		progress.appendTo(".pollResults");
	}

	loadResults ();
	refreshResults(choices);


})