var saveButtons = $('.saveBtn')


saveButtons.on('click', saveHourData());

function saveHourData (){
    var userInput = $('hourInput')
    localStorage.setItem("input", userInput)
}