//declare a variable set to the button elements in the HTML
var saveButtons = $('button');
//declare a variable for the p element that will house the current date
var currentDay = $('#currentDay');
//declare a variable for the moment() function (in hindsight, this wasn't really necessary)
var today = moment();

//declare a variable that is an array of all of the textareas in the document
var hourText = $('textarea').toArray();
           
//Appends the current date grabbed from the moment API into the the appropriate div.
currentDay.append(moment().format('dddd, MMMM Do, YYYY'));
 /*'dddd' gets the current day in string form, MMMM gets the current month in string form, Do gets the day of the month
 in int form, and YYYY gets the current year in int form (eg 2021) */


//when a save button is clicked...
saveButtons.on('click', function(){
//for every item in the hourText array we just created...
  for (var i = 0; i < hourText.length; i++) {
    //if the save button we clicked has an id that matches a certain row, that means the save button is also on that row
    if (($(this).attr('id')) === $(hourText[i]).attr('id')) {
      //so ultimately when we hit 'save', we send whatever text is in that row's textarea to local storage
      localStorage.setItem("hour: "+$(hourText[i]).attr('id'), $(hourText[i]).val());
    }
  }  
})
  //name a function for determining which hours on the planner are in the past, in the future, or the present hour
  function pastPresentFuture () {
    //so for each of our classes labeled 'row' (which is every row in the planner), execute the following function:
    $('textarea').each( function() { 
      //if the integer value (parseInt()) of the 'value' attribute I set for the rows is < the integer value for the current hour (e.g. noon = 12)
      if ((parseInt($(this).attr('value'))) < (parseInt(today.format('HH')))) {
        //then for this particular row, we will label it in the past, which changes its formatting
        $(this).attr('class', 'past');
      }
      //if the integer value of the 'value' attr is GREATER than the integer value for the current hour, we add the 'future' class
      else if (((parseInt($(this).attr('value'))) > (parseInt(today.format('HH'))))) {
        $(this).attr('class', 'future');
      }
      //if the integer value for the current row's value attr is the same as the current hour, we add the 'present' class to 
      else if (((parseInt($(this).attr('value'))) === (parseInt(today.format('HH'))))) {
        $(this).attr('class', 'present')
   }
  })
} 

function onRefresh() {
//for every item in our array of hourly textareas we created globally...
  for (var i = 0; i < hourText.length; i++) {
    //...if a key for that specific hour of the day exists in local storage... 
    if (localStorage.getItem("hour: "+$(hourText[i]).attr('id'))) {    

    //...populate the textarea with the value associated with that key in local storage
    //this does indeed work and keeps text on refresh, but it doesn't FEEL right lol. An inelegant solution perhaps.
     $(hourText[i]).val(localStorage.getItem("hour: "+$(hourText[i]).attr('id')));
    }
  }
}

//call pastPresentFuture right away so page will be nicely color-coded on loading
pastPresentFuture(); 
//similarly, call the onRefresh function so that anytime the page is refreshed it executes
onRefresh();
