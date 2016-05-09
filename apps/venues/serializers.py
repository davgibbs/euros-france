from rest_framework import serializers

from .models import Venue, Team, Match


class VenueSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Venue
        fields = ('name', 'id')


class TeamSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Team
        fields = ('name', 'id')


class MatchSerializer(serializers.HyperlinkedModelSerializer):

    def validate(self, data):
        """
        Check that the start is before the stop.
        """
        teamone = data['teamone']
        teamtwo = data['teamtwo']

        if teamone == teamtwo:
            raise serializers.ValidationError("Team '{team}' cannot play against themselves!".format(team=teamone))
        return data

    class Meta:
        model = Match
        depth = 1
        fields = ('id', 'date', 'time', 'venue', 'teamone', 'teamtwo', 'teamonescore', 'teamtwoscore')
