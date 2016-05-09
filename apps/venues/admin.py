from django.contrib import admin

from .models import Venue, Team, Match

admin.site.register(Venue)
admin.site.register(Team)
admin.site.register(Match)
