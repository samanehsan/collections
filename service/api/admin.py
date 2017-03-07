from django.contrib import admin
from api.models import Collection, Item
from guardian.shortcuts import get_objects_for_user


def approve_item(modeladmin, request, queryset):
    queryset.update(status='approved')


class ItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'created_by', 'status')
    actions = [approve_item]

    def get_search_results(self, request, queryset, search_term):
        user = request.user
        collections = get_objects_for_user(user, 'api.approve_items')
        return self.model.objects.filter(collection__in=collections), True

admin.site.register(Item, ItemAdmin)
