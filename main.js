var btn = document.querySelector("#new-quote");
var quoteText = document.querySelector("#quote-text");
var quoteAuthor = document.querySelector(".quote-author")
var head = document.querySelector("head");
var main = document.querySelector(".main");
var a = document.querySelectorAll(".quote-share div");
var quote = document.querySelector(".fa-quote-left");
//random range
function random(min,max) {
    var num = Math.floor(Math.random()*(max-min)) + min;
    return num;
  }

//initializations
let data = {};
loadJSONP();
btn.addEventListener("click", updateQuote);

//function to handle the click event
function updateQuote () {
    loadJSONP();
    animateCss(main, "fadeIn");
    let color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
    main.style.backgroundColor = color;
    quoteText.style.color = color;
    quoteAuthor.style.color = color;
    btn.style.backgroundColor = color;
    a[0].style.backgroundColor = color;
    a[1].style.backgroundColor = color;
    quote.style.color = color;
    console.log(data);
    quoteText.textContent = data["quoteText"]
    if (data["quoteAuthor"] === ""){
        quoteAuthor.textContent = "-Unknown"
    }
    quoteAuthor.textContent = "-" + data["quoteAuthor"];   
}

//handles what to do with the data based on the callback function
function myData (json){
    data = json 
}

//loads the JSONP data into the document itself
function loadJSONP () {
    var script = document.createElement("script");
    script.setAttribute("src", "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=myData");
    head.appendChild(script);
    script.onload = function () {
        this.remove();
    }
};

//handles animation reset so animation occurs anytime the button is clicked
function animateCss(node, animationName) {
    node.classList.add("animated", animationName)
    function handleAnimationEnd() {
        node.classList.remove("animated", animationName)
        node.removeEventListener("animationend", handleAnimationEnd)

    }
    node.addEventListener("animationend", handleAnimationEnd);
}

a[0].addEventListener("click", linkMe)
function linkMe(){
    console.log("Click")
    if (data !== {}){
        let myText = "https://twitter.com/intent/tweet?text=Hello%20world";
        a[0].setAttribute("href", myText);
    }
    
}