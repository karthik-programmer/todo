from django.urls import path
from django.utils.regex_helper import normalize
from .views import (
  api_get_view,
  api_post_view,
  api_put_view,
  api_delete_view,
)


urlpatterns = [
  path('get/', api_get_view, name='api-get-view'),
  path('post/', api_post_view, name='api-post-view'),
  path('put/<int:pk>/', api_put_view, name='api-put-view'),
  path('delete/<int:pk>/', api_delete_view, name='api-delete-view'),
]

