/* globals listen_for_jstree_clicks: true, selected_venue: true, listen_for_change_clicks: true */
"use strict";

function format_date(in_date){
    var d = new Date(in_date);
    var out_date = d.toLocaleDateString('en-GB', {
        day : 'numeric',
        month : 'short',
        year : 'numeric'
    });
    return out_date;
}


function format_time(in_time){
    return in_time.slice(0, -3);
}


function format_score(in_score){
    if (in_score === null){
        return '-';
    }
    return in_score;
}


function populate_event_table(venue_id){
    // Make an Ajax call to the api to get all events
    var graph_get = $.ajax({
            url: "../api/matches/?venue_id=" + venue_id,
            type: "GET",
        });
    selected_venue.venue_id = venue_id;

    $('#ajax-spinner').show();
    graph_get.done(function( data ) {
        $('#ajax-spinner').hide();
        $('#hp_events_table').empty();

        var $add_button = $('<div id="match-add-div"><button type="button" class="btn btn-large btn-info" id="match-add"><i class="glyphicon glyphicon-plus"></i> &nbsp; Add New Match</button></div>');

        var $table = $('<table class="table table-bordered" />');
        $table.append('<tr><th>Date</th><th>Team 1</th><th>&nbsp;</th><th>&nbsp;</th><th>Team 2</th><th colspan="2" style="text-align: center">Actions</th></tr>' );
        for (var event = 0; event < data.results.length; event++) {
            var $row = $('<tr />');
            $row.append('<td>' + format_date(data.results[event].date) + ' ' + format_time(data.results[event].time) + '</td>' );
            $row.append('<td>' + data.results[event].teamone_obj.name + '</td><td>' + format_score(data.results[event].teamonescore) + '</td>' );
            $row.append('<td>' + format_score(data.results[event].teamtwoscore) + '</td><td>' + data.results[event].teamtwo_obj.name + '</td>' );
            $row.append('<td align="center" class="match-delete" name="' + data.results[event].id + '"><a><span title="Delete" class="glyphicon glyphicon-remove"></span></a></td>');
            $row.append('<td align="center" class="match-edit" name="' + data.results[event].id + '"><a><span title="Edit" class="glyphicon glyphicon-edit"></span></a></td>');
            $table.append($row);
        }
        $('#hp_events_table').append($add_button);
        $('#hp_events_table').append($table);

        listen_for_change_clicks();

        // Update the URL
        History.pushState(null, null, '?venue_id='+ venue_id);

    });
}


function listen_for_jstree_clicks() {
    $('#jstree_div').on("changed.jstree", function (e, data) {
        // Do not try populate table if no data is selected
        if (data.selected[0] !== undefined) {
            populate_event_table(data.selected[0]);
        }
    });
}
