from django.db import models


class Task(models.Model):
  title = models.CharField(verbose_name='Title', max_length=60)
  status = models.BooleanField(verbose_name='Status', default=False)

  def __str__(self):
    return str(self.title)