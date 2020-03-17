$(document).ready(function() {
    $("#btn").click(function() {
        $(".color").slideToggle("fast");
    });
});


$(document).ready(function() {
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
    popup window
    */
    function deselect(e) {
        $('.pop').slideFadeToggle(function() {
            e.removeClass('selected');
        });
    }

    $(function() {
        $('#create-new-reminder').on('click', function() {
            if ($(this).hasClass('selected')) {
                deselect($(this));
            } else {
                $(this).addClass('selected');
                $('.pop').slideFadeToggle();
            }
            return false;
        });

        $('.close').on('click', function() {
            deselect($('#create-new-reminder'));
            return false;
        });
    });

    $.fn.slideFadeToggle = function(easing, callback) {
        return this.animate({ opacity: 'toggle', height: 'toggle' }, 'fast', easing, callback);
    };
    /*
    end popup window
    */

    //add-more button functionality
    $('#add-more-subtasks').click(function() {
        //maximum 5 subtasks
        //make this variable static
        if (typeof subtaskCount == 'undefined') {
            subtaskCount = 1;
        }

        //get all subtasks then store in array
        let subtaskArray = []
        $('.subtask-input').each(function() {
            subtaskArray.push($(this).val());
        });

        //check if theres any empty one, and subtasks of more than 4
        //if not, add subtask input field
        if (subtaskArray.includes("")) {
            $('.subtask-input:last').attr('placeholder', 'Enter a subtask before adding more..');
        } else if (subtaskCount >= 5) {

        } else {
            input = $('<input type="text" placeholder="Enter subtask.." name="subtask-input" class="subtask-input">');
            $('#subtasks-div').append(input);
            subtaskCount++;
        }
    })

    //create button functionality
    $('#create').click(function() {
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
        $('.subtask').each(function() {
            if ($(this).val() != '') {
                subtaskArray.push($(this).val());
            }
        });
        console.log(subtaskArray);
    });
});