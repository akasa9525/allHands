(function() {
  // const myQuestions = [
  //   {
  //     question: "Who is the strongest?",
  //     answers: {
  //       a: "Superman",
  //       b: "The Terminator",
  //       c: "Waluigi, obviously"
  //     },
  //     correctAnswer: "c"
  //   },
  //   {
  //     question: "What is the best site ever created?",
  //     answers: {
  //       a: "SitePoint",
  //       b: "Simple Steps Code",
  //       c: "Trick question; they're both the best"
  //     },
  //     correctAnswer: "c"
  //   },
  //   {
  //     question: "Where is Waldo really?",
  //     answers: {
  //       a: "Antarctica",
  //       b: "Exploring the Pacific Ocean",
  //       c: "Sitting in a tree",
  //       d: "Minding his own business, so stop asking"
  //     },
  //     correctAnswer: "d"
  //   }
  // ];
  const ansArray = ["Iron Man", "Amazon", "Antarctica", "Number"];
  const myQuestions = [
    {
      question: "Who is the strongest?",
      correctAnswer: "Iron Man"
    },
    {
      question: "What is the best site ever created?",
      correctAnswer: "Amazon"
    },
    {
      question: "Where is south Pole?",
      correctAnswer: "Antarctica"
    },
    {
      question: "What is Zero?",
      correctAnswer: "Number"
    }
  ];

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
       ans = ansArray.slice();
      //alert(ans);
      const answers = [];
      var index = ans.indexOf(currentQuestion.correctAnswer);
      if (index !== -1) ans.splice(index, 1);
      // and for each available answer...

      ans = ans.slice(-2);
      ans.push(currentQuestion.correctAnswer);
      shuffle(ans);
      // for (option in ans) {
      //   // ...add an HTML radio button
      //   answers.push(
      //     `<label>
      //        <input type="radio" name="question${questionNumber}" value="${option}">
      //         ${option}
      //      </label>`
      //   );
      // }
      for(let i = 0; i<ans.length; i++){
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${ans[i]}">
              ${ans[i]}
           </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    //alert(output.join(""));
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;

    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }

    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // display quiz right away
  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
