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
    if (document.cookie && document.cookie != '') {
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
        process_and_show_result('Successfully added match between: "' + team_one_name + '" and "' + team_two_name + '" on "' + date + '"');
        populate_event_table(selected_venue.venue_id);
    });
});


// Handle Delete Event form submission
var delete_form = $('#delete-event-form');
// Unbind any previous bindings for add
$(delete_form).unbind( "submit" );
$(delete_form).submit(function(event) {
    event.preventDefault();
    $("#DeleteMatchModal").modal('hide');

    var event_id = $("input[id='DeleteEventID']").val();

    var delete_event_delete = $.ajax({
      url: "../api/events/" + event_id + "/",
      type: "DELETE",
      dataType: "json",
    });

    //$('.spinner').show();
    delete_event_delete.done(function( data ) {
        process_and_show_result('Successfully deleted event id: "' + event_id + '"');
        populate_event_table(selected_character.character_id);
    });
});


// Handle Edit Event form submission
var edit_form = $('#edit-event-form');
// Unbind any previous bindings for add
$(edit_form).unbind( "submit" );
$(edit_form).submit(function(event) {
    event.preventDefault();
    $("#EditMatchModal").modal('hide');

    var event_id = $("input[id='EditEventID']").val();
    var event_date = $("input[id='EditEventDate']").val();
    var event_title = $("input[id='EditEventTitle']").val();

    var edit_event_put = $.ajax({
      url: "../api/events/" + event_id + "/",
      type: "PUT",
      dataType: "json",
      data: {"id": event_id,
             "date": event_date,
             "title": event_title,
             "short_description": "description",
             "hp_character": "http://127.0.0.1:8000/api/characters/" + selected_character.character_id + "/",
             }
      });

    //$('.spinner').show();
    edit_event_put.done(function( data ) {
        process_and_show_result('Successfully updated event id: "' + event_id + '"');
        populate_event_table(selected_character.character_id);
    });
});