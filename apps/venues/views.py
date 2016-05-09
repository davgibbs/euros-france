from django.shortcuts import render
from rest_framework import viewsets
from .serializers import VenueSerializer, TeamSerializer, MatchSerializer
from .models import Venue, Team, Match


def index(request):
    return render(request, "venues/index.html", {})


class VenueViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows venues to be viewed or edited.
    """
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer


class TeamViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows teams to be viewed or edited.
    """
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


class MatchViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows matches to be viewed or edited.
    """
    serializer_class = MatchSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given venue,
        by filtering against a `venue_id` query parameter in the URL.
        """
        queryset = Match.objects.all()
        venue_id = self.request.query_params.get('venue_id', None)
        if venue_id is not None:
            queryset = queryset.filter(venue__id=venue_id)

        return queryset