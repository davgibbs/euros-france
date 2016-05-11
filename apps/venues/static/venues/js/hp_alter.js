"use strict";

// A generic method to process and show the result
function process_and_show_result(message){
    $("#response_type").text("Success");
    $("#wmh-button-type").addClass( "btn-success" );
    $("#modal-message").html(message);

    $("#resultModal").modal('show');
}


function listen_for_change_clicks() {
    $(document).ready(function(){
        // Handle Add Event button press
        $("#event-add").click( function() {
            var teams_get = $.ajax({
                 url: "../api/teams/",
                 type: "GET",
            });

            teams_get.done(function( data ) {
                $("#AddMatchModal").modal('show');

                $("#InputMatchTeamOne").empty();
                $("#InputMatchTeamTwo").empty();
                for (var i = 0; i < data.results.length; i++){
                    $("#InputMatchTeamOne").append('<option value="'+ data.results[i].id +'">' + data.results[i].name + '</option>');
                    $("#InputMatchTeamTwo").append('<option value="'+ data.results[i].id +'">' + data.results[i].name + '</option>');
                }
            });
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