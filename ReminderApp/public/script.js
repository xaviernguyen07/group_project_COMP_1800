$(document).ready(function () {
    $(".open").click(function () {
        $(".color").addClass("active");
    });
    $(".close").click(function () {
        $(".color").removeClass("active");
    });
    $('#date').pickadate({
        formatSubmit: 'mm/dd/yyyy',
        hiddenName: false
    });
    $('#time').pickatime({
        formatSubmit: 'HH:i',
        hiddenName: false
    });
});

$(document).ready(function () {
    /*
    date/time picker
    */
    $('#date').pickadate({
        formatSubmit: 'mm/dd/yyyy',
        hiddenName: false
    });

    $('#time').pickatime({
        formatSubmit: 'HH:i',
        hiddenName: false
    });
    /*
    date/time picker
    */

    /*
    popup window create new reminder
    */
    function deselect(e) {
        $('.pop').slideFadeToggle(function () {
            e.removeClass('selected');
        });
    }

    $(function () {
        $('#create-new-reminder').on('click', function () {
            if ($(this).hasClass('selected')) {
                deselect($(this));
            } else {
                $(this).addClass('selected');
                $('.pop').slideFadeToggle();
            }
            return false;
        });

        $('.close').on('click', function () {
            deselect($('#create-new-reminder'));
            return false;
        });
    });

    $.fn.slideFadeToggle = function (easing, callback) {
        return this.animate({ opacity: 'toggle', height: 'toggle' }, 'fast', easing, callback);
    };

    $('#closeButton_create').click(()=>{
        deselect($('#create-new-reminder'));
        return false;
    });
    /*
    end popup window create new reminder
    */

    //add-more button functionality
    $('#add-more-subtasks').click(function () {
        //maximum 5 subtasks
        //make this variable static
        if (typeof subtaskCount == 'undefined') {
            subtaskCount = 1;
        }

        //get all subtasks then store in array
        let subtaskArray = []
        $('.subtask-input').each(function () {
            subtaskArray.push($(this).val());
        });

        //check if theres any empty one, and subtasks of more than 4
        //if not, add subtask input field
        if (subtaskArray.includes("")) {
            $('.subtask-input:last').attr('placeholder', 'Enter a subtask before adding more..');
        } else if (subtaskCount >= 5) {

        } else {
            input = $('<input type="text" placeholder="Enter subtask.." name="subtask" class="subtask-input">');
            $('#subtasks-div').append(input);
            subtaskCount++;
        }
    });
})



//Stuff for umbrella button
async function sendToDarkSky(dsKey, latitude, longitude) {
    const no_cors = 'https://cors-anywhere.herokuapp.com/'
    const fetchResponse = await fetch(
        //`http://localhost:3000/darksky?lat=${latitude}&long=${longitude}&`
        //`${no_cors}https://api.darksky.net/forecast/${dsKey}/${latitude},${longitude}`
        'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/03c38bf0d83946fe44d22710353f13a1/49.1585536,-123.1814656?units=auto&exclude=[currently,minutely,hourly,alerts,flags]'
      );
      const data = await fetchResponse.json();
      return data;
};

//Stuff for umbrella button
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

//Stuff for umbrella button
function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    let today = new Date();
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    console.log(lat, lon);
    sendToDarkSky('03c38bf0d83946fe44d22710353f13a1', lat, lon)
        .then(data => {
            console.log(data);
            var icons = new Skycons({"color": "#7A4675"});
            for(let i =0; i < 7; i++){
                //day of the week
                $('#day'+ i).text(days[(today.getDay()+i) % 7]);
                //set icon
                icons.set('day'+i+'icon',data.daily.data[i].icon);
                //set low tempurature
                $('#day'+i+'temperaturelow').text('Low: '+data.daily.data[i].temperatureLow+'C');
                //set high tempurature
                $('#day'+i+'temperaturehigh').text('High: '+data.daily.data[i].temperatureHigh+'C');
            }
            icons.play();
        })
        .catch(err => console.log(err))
}

//action of umbrella button
$('#umbBtn').click(function () {
    getLocation();
});


//create button functionality
$('#create').click(function () {

    let title = $('#title').val();
    console.log(title);

    //get date as a string
    let date = $('#date').val();
    console.log(date);

    //get time as a string
    let time = $('#time').val();
    console.log(time);

    //store them together to a Date object
    let dateObject = new Date(date + ' ' + time);
    console.log(dateObject);

    //array to store subtasks
    let subtaskArray = [];
    //store all non-empty subtasks
    $('.subtask').each(function () {
        if ($(this).val() != '') {
            subtaskArray.push($(this).val());
        }
    });
    console.log(subtaskArray);
});

