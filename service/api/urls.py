from django.conf.urls import url
import views

urlpatterns = [
    url(r'^$', views.api_root),
    url(r'^collections/$', views.CollectionList.as_view(), name='collection-list'),
    url(r'^collections/(?P<pk>\w+)/$', views.CollectionDetail.as_view(), name='collection-detail'),
    url(r'^collections/(?P<pk>\w+)/groups/$', views.GroupList.as_view(), name='group-list'),
    url(r'^collections/(?P<pk>\w+)/groups/(?P<group_id>\w+)/$', views.GroupDetail.as_view(), name='group-detail'),
    url(r'^collections/(?P<pk>\w+)/groups/(?P<group_id>\w+)/items/$', views.GroupItemList.as_view(), name='group-item-list'),
    url(r'^collections/(?P<pk>\w+)/groups/(?P<group_id>\w+)/items/(?P<item_id>\w+)/$', views.ItemDetail.as_view(), name='group-item-detail'),
    url(r'^collections/(?P<pk>\w+)/items/$', views.CollectionItemList.as_view(), name='collection-item-list'),
    url(r'^collections/(?P<pk>\w+)/items/(?P<item_id>\w+)/$', views.ItemDetail.as_view(), name='collection-item-detail'),
]
