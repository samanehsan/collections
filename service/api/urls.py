from django.conf.urls import url
import views

urlpatterns = [
    url(r'^collections/$', views.CollectionList.as_view()),
    url(r'^collections/(?P<pk>\w+)/$', views.CollectionDetail.as_view()),
    url(r'^collections/(?P<pk>\w+)/items/$', views.CollectionItemList.as_view()),
]
