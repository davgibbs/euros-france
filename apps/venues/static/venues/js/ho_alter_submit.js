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

// Handle Add Event form submission
var add_form = $('#add-event-form');
// Unbind any previous bindings for add
$(add_form).unbind( "submit" );
$(add_form).submit(function(event) {
    event.preventDefault();
    $("#AddEventModal").modal('hide');

    var event_date = $("input[id='InputEventDate']").val();
    var event_title = $("input[id='InputEventTitle']").val();

    var add_event_post = $.ajax({
      url: "../api/events/",
      type: "POST",
      dataType: "json",
      data: { "date": event_date,
              "title": event_title,
             "short_description": "description",
             "hp_character": "http://127.0.0.1:8000/api/characters/" + selected_character.character_id + "/",
             }
        });

    //$('.spinner').show();
    add_event_post.done(function( data ) {
        process_and_show_result('Successfully added event: "' + event_title + '" on "' + event_date + '"');
        populate_event_table(selected_character.character_id);
    });
});


// Handle Delete Event form submission
var delete_form = $('#delete-event-form');
// Unbind any previous bindings for add
$(delete_form).unbind( "submit" );
$(delete_form).submit(function(event) {
    event.preventDefault();
    $("#DeleteEventModal").modal('hide');

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
    $("#EditEventModal").modal('hide');

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