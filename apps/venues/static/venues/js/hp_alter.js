"use strict";

// A generic method to process and show the result
function process_and_show_result(message, success){
    if (success === false){
        $("#response_type").text("Error");
        $("#wmh-button-type").addClass( "btn-danger" );
    }
    else{
        $("#response_type").text("Success");
        $("#wmh-button-type").addClass( "btn-success" );
    }

    $("#modal-message").html(message);
    $("#resultModal").modal('show');
}


function listen_for_change_clicks() {
    $(document).ready(function(){
        // Handle Add Event button press
        $("#match-add").click( function() {
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
        $(".match-delete").click( function() {
            $("#DeleteMatchModal").modal('show');

            var match_id = $(this).attr('name');
            $("#DeleteMatchID").val(match_id);
            var match_get = $.ajax({
                 url: "../api/matches/" + match_id + "/",
                 type: "GET",
            });

            match_get.done(function(data) {
                $("#DeleteMatchDate").val(data.date);
                $("#DeleteMatchTime").val(data.time);
                $("#DeleteMatchTeamOne").val(data.teamone_obj.name);
                $("#DeleteMatchTeamTwo").val(data.teamtwo_obj.name);
                $("#DeleteMatchTeamOneScore").val(data.teamonescore);
                $("#DeleteMatchTeamTwoScore").val(data.teamtwoscore);
            });
        });

        // Handle Edit Event button press
        $(".match-edit").click( function() {
            $("#EditMatchModal").modal('show');
            var match_id = $(this).attr('name');

            var teams_get = $.ajax({
                 url: "../api/teams/",
                 type: "GET",
            });
            teams_get.done(function(data) {
                $("#EditMatchTeamOne").empty();
                $("#EditMatchTeamTwo").empty();
                for (var i = 0; i < data.results.length; i++){
                    $("#EditMatchTeamOne").append('<option value="'+ data.results[i].id +'">' + data.results[i].name + '</option>');
                    $("#EditMatchTeamTwo").append('<option value="'+ data.results[i].id +'">' + data.results[i].name + '</option>');
                }

                // Now Do an ajax request for the particular match
                $("#EditMatchID").val(match_id);
                var match_get = $.ajax({
                     url: "../api/matches/" + match_id + "/",
                     type: "GET",
                });

                match_get.done(function(data) {
                    $("#EditMatchDate").val(data.date);
                    $("#EditMatchTime").val(data.time);

                    $("#EditMatchTeamOneScore").val(data.teamonescore);
                    $("#EditMatchTeamTwoScore").val(data.teamtwoscore);

                    $("#EditMatchTeamOne option[value='" + data.teamone_obj.id + "']").prop('selected', true);
                    $("#EditMatchTeamTwo option[value='" + data.teamtwo_obj.id + "']").prop('selected', true);
                });
            });
        });
    });
}