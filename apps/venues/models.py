from __future__ import unicode_literals

from django.db import models


class Venue(models.Model):
    """ Venue in Euro 2016 """
    name = models.CharField(max_length=100, unique=True)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = 'Venue'
        verbose_name_plural = 'Venues'


class Team(models.Model):
    """ Team in Euro 2016 """
    name = models.CharField(max_length=100, unique=True)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = 'Team'
        verbose_name_plural = 'Teams'


class Match(models.Model):
    """ Match in Euro 2016 """
    date = models.DateField('Date of Match')
    time = models.TimeField('Time of Match')
    venue = models.ForeignKey(Venue, verbose_name='Venue')
    # Add in related name as two foreign keys to the same table
    teamone = models.ForeignKey(Team, verbose_name='Team One', related_name='match_teamone')
    teamtwo = models.ForeignKey(Team, verbose_name='Team Two', related_name='match_teamtwo')
    # Allow blank for scores that are in the future
    teamonescore = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Team One Goals')
    teamtwoscore = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Team Two Goals')

    def __unicode__(self):
        return '{date}-{venue}'.format(date=self.date, venue=self.venue)

    class Meta:
        verbose_name = 'Match'
        verbose_name_plural = 'Matches'
        unique_together = [['date', 'venue']]

