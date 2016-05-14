from django.contrib import admin
from django.utils.translation import ugettext_lazy as _
from django.db.models import Q

from .models import Venue, Team, Match


class TeamOneOrTwoFilter(admin.SimpleListFilter):
    # Human-readable title which will be displayed in the
    # right admin sidebar just above the filter options.
    title = _('Team')

    # Parameter for the filter that will be used in the URL query.
    parameter_name = 'team'

    def lookups(self, request, model_admin):
        """
        Returns a list of tuples. The first element in each
        tuple is the coded value for the option that will
        appear in the URL query. The second element is the
        human-readable name for the option that will appear
        in the right sidebar.
        """
        return [(team.name, team.name) for team in Team.objects.all()]

    def queryset(self, request, queryset):
        """
        Returns the filtered queryset based on the value
        provided in the query string and retrievable via
        `self.value()`.
        """
        if self.value():
            return queryset.filter(Q(teamone__name=self.value()) | Q(teamtwo__name=self.value()))

        return queryset


class MatchAdmin(admin.ModelAdmin):
    list_display = ('id', '__unicode__', 'date', 'time', 'venue', 'teamone', 'teamtwo')
    search_fields = ('=id', '__unicode__')
    list_filter = (TeamOneOrTwoFilter, 'venue', 'date')
    list_display_links = ('id', '__unicode__')


admin.site.register(Venue)
admin.site.register(Team)
admin.site.register(Match, MatchAdmin)
