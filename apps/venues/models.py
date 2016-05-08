from __future__ import unicode_literals

from django.db import models


class Venue(models.Model):
    venue_name = models.CharField(max_length=100, unique=True)

    def __unicode__(self):
        return self.venue_name

    class Meta:
        verbose_name = 'Venue'
        verbose_name_plural = 'Venues'


class Match(models.Model):
    date = models.DateField('date of event')
    time = models.TimeField('time of event')
    teamone = models.CharField(max_length=100, verbose_name='Team One')
    teamtwo = models.CharField(max_length=100, verbose_name='Team Two')
    venue = models.ForeignKey(Venue, verbose_name='Venue')
    teamonegoals = models.IntegerField()
    teamtwogoals = models.IntegerField()

    def __unicode__(self):
        return '{date}-{venue}'.format(date=self.date, venue=self.venue)

    class Meta:
        verbose_name = 'match'
        verbose_name_plural = 'matches'
        unique_together = [['date', 'venue']]

