"use strict";

// A generic method to process and show the result
function process_and_show_result(message){
    //$('.spinner').hide();
    $("#response_type").text("Success");
    $("#wmh-button-type").addClass( "btn-success" );
    $("#modal-message").html(message);

    $("#resultModal").modal('show');
}


function listen_for_change_clicks() {
    $(document).ready(function(){
        // Handle Add Event button press
        $("#event-add").click( function() {
            $("#AddEventModal").modal('show');
        });

        // Handle Delete Event button press
        $(".event-delete").click( function() {
            $("#DeleteEventModal").modal('show');

            var event_id = $(this).attr('name');
            $("#DeleteEventID").val(event_id);

            var date = $(this).siblings("td:first").text();
            var title = $(this).siblings("td:nth-child(2)").text();
            $("#DeleteEventDate").val(date);
            $("#DeleteEventTitle").val(title);
        });

        // Handle Edit Event button press
        $(".event-edit").click( function() {
            $("#EditEventModal").modal('show');

            var event_id = $(this).attr('name');
            $("#EditEventID").val(event_id);

            var date = $(this).siblings("td:first").text();
            var title = $(this).siblings("td:nth-child(2)").text();
            $("#EditEventDate").val(date);
            $("#EditEventTitle").val(title);
        });
    });
}