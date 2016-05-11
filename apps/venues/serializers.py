from rest_framework import serializers

from .models import Venue, Team, Match


class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = ('name', 'id')


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('name', 'id')


class MatchSerializer(serializers.ModelSerializer):
    teamone_obj = TeamSerializer(source="teamone", read_only=True, required=False)
    teamtwo_obj = TeamSerializer(source="teamtwo", read_only=True, required=False)

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
        fields = ('id', 'date', 'time', 'venue', 'teamone', 'teamtwo', 'teamone_obj', 'teamtwo_obj', 'teamonescore',
                  'teamtwoscore')
