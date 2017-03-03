from django.contrib import admin
from api.models import Collection, Item


def approve_item(modeladmin, request, queryset):
    queryset.update(status='approved')


class ItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'created_by', 'status')
    actions = [approve_item]

    def get_search_results(self, request, queryset, search_term):
        user = request.user
        return self.model.objects.filter(collection__created_by=user), True

admin.site.register(Item, ItemAdmin)
