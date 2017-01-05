from django.conf.urls import url
import views

urlpatterns = [
    url(r'^collections/$', views.CollectionList.as_view()),
    url(r'^items/$', views.ItemList.as_view())
]
