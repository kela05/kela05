(function($) {
  $(document).ready(function() {
    var quiz = [];
    var questionDiv = document.querySelector(".quiz-questions");
    var quizForm = document.querySelector(".quiz-form");
    var answerResults = document.querySelector(".answer-results");
    quizForm.addEventListener("submit", checkAnswers);

    $.ajax({
      type: "GET",
      url: "api.json",
      contentType: "application/json",
      success: function(response) {
        console.log(response);
        quiz = response.data; // Use this for local json file.
        showQuestions();
      },
      error: function() {
        alert("Cannot load quiz!");
      }
    });

    function showQuestions() {
      var questionsHtml = "";

      quiz.forEach(function(item) {
        questionsHtml += `<h3 class="question-title">${item.question}</h3>`;
        questionsHtml += '<div class="options">';

        item.answers.forEach(function(answer) {
          questionsHtml += `<label><input type="radio" name="question-${item.id}" value="${answer.value}" />${answer.label}</label>`;
        });

        questionsHtml += "</div><hr />";
      });

      questionDiv.innerHTML = questionsHtml;
    }

    function checkAnswers(event) {
      event.preventDefault(); // Ndalon reload te faqes pasi shtypet butoni submit i formes.

      var form = event.target;

      var answersHtml = "";
      quiz.forEach(function(question) {
        // Get selected answer from user.
        var answer = form[`question-${question.id}`].value;

        // Get the correct answer of the question.
        var correctAnswer = question.answers.find(function(answerObject) {
          return answerObject.value == question.correct_answer;
        });

        // Check if the answer is wrong
        if (answer != correctAnswer.value) {
          // If it's wrong, add a message and show the correct answer.
          answersHtml += `<p>Wrong answer for question ${question.id} - Correct answer is: '${correctAnswer.label}'!</p>`;
        }
      });

      // If the answersHtml is null, means that all answers are correct (so no answersHtml was added before).
      if (answersHtml == "") {
        answersHtml = "All answers are correct!";
      }

      // Show the results of the quiz.
      questionDiv.innerHTML = answersHtml;
    }
  });
})(jQuery);
