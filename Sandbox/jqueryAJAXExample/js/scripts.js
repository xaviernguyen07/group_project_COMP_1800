alert(1);

function getTextFromServerViaAJAX(){
    $.ajax({
        type: "GET",
        url: "randomText.txt",
        success: insertIntoPage});
}

function insertIntoPage(data, status){
    $('#elementToChange').html(data);
}


$('document').ready( function() {
    $("button").click(function (){
        getTextFromServerViaAJAX()});    
})
