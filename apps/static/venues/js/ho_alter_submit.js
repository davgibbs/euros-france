/* globals selected_venue: true, populate_event_table: true , process_and_show_result: true*/
"use strict";

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});


// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');

// Handle Add Match form submission
var add_form = $('#add-match-form');
// Unbind any previous bindings for add
$(add_form).unbind( "submit" );
$(add_form).submit(function(event) {
    event.preventDefault();
    $("#AddMatchModal").modal('hide');

    var date = $("input[id='InputMatchDate']").val();
    var time = $("input[id='InputMatchTime']").val();
    var team_one = $("select[id='InputMatchTeamOne']").val();
    var team_two = $("select[id='InputMatchTeamTwo']").val();
    var team_one_name = $("#InputMatchTeamOne option:selected").text();
    var team_two_name = $("#InputMatchTeamTwo option:selected").text();
    var team_one_score = $("input[id='InputMatchTeamOneScore']").val();
    var team_two_score = $("input[id='InputMatchTeamTwoScore']").val();

    var add_event_post = $.ajax({
      url: "../api/matches/",
      type: "POST",
      dataType: "json",
      data: { "date": date,
              "time": time,
              "venue": "" + selected_venue.venue_id + "",
              "teamone": team_one,
              "teamtwo": team_two,
              "teamonescore": team_one_score,
              "teamtwoscore": team_two_score,
             }
        });

    add_event_post.done(function( data ) {
        process_and_show_result('Successfully added match between: "' + team_one_name + '" and "' + team_two_name + '" on "' + date + '"', true);
        populate_event_table(selected_venue.venue_id);
    });

    add_event_post.error(function( data ) {
        process_and_show_result('Error adding match between: "' + team_one_name + '" and "' + team_two_name + '" on "' + date + '": '+ data.responseText, false);
        populate_event_table(selected_venue.venue_id);
    });
});


// Handle Delete Match form submission
var delete_form = $('#delete-match-form');
// Unbind any previous bindings for add
$(delete_form).unbind( "submit" );
$(delete_form).submit(function(event) {
    event.preventDefault();
    $("#DeleteMatchModal").modal('hide');

    var match_id = $("input[id='DeleteMatchID']").val();
    var delete_match_delete = $.ajax({
      url: "../api/matches/" + match_id + "/",
      type: "DELETE",
      dataType: "json",
    });

    //$('.spinner').show();
    delete_match_delete.done(function( data ) {
        process_and_show_result('Successfully deleted match id: "' + match_id + '"', true);
        populate_event_table(selected_venue.venue_id);
    });

    delete_match_delete.error(function( data ) {
        process_and_show_result('Error deleting match id: "' + match_id + '"": '+ data.responseText, false);
        populate_event_table(selected_venue.venue_id);
    });
});


// Handle Edit Match form submission
var edit_form = $('#edit-match-form');
// Unbind any previous bindings for add
$(edit_form).unbind( "submit" );
$(edit_form).submit(function(event) {
    event.preventDefault();
    $("#EditMatchModal").modal('hide');

    var match_id = $("input[id='EditMatchID']").val();
    var date = $("input[id='EditMatchDate']").val();
    var time = $("input[id='EditMatchTime']").val();
    var team_one = $("select[id='EditMatchTeamOne']").val();
    var team_two = $("select[id='EditMatchTeamTwo']").val();
    var team_one_score = $("input[id='EditMatchTeamOneScore']").val();
    var team_two_score = $("input[id='EditMatchTeamTwoScore']").val();

    var edit_event_put = $.ajax({
      url: "../api/matches/" + match_id + "/",
      type: "PUT",
      dataType: "json",
      data: { "date": date,
              "time": time,
              "venue": "" + selected_venue.venue_id + "",
              "teamone": team_one,
              "teamtwo": team_two,
              "teamonescore": team_one_score,
              "teamtwoscore": team_two_score,
             }
      });

    //$('.spinner').show();
    edit_event_put.done(function( data ) {
        process_and_show_result('Successfully updated match id: "' + match_id + '"', true);
        populate_event_table(selected_venue.venue_id);
    });

    edit_event_put.error(function( data ) {
        process_and_show_result('Error updating match id: "' + match_id + '": '+ data.responseText, false);
        populate_event_table(selected_venue.venue_id);
    });
});