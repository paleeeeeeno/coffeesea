from django.contrib import admin
from .models import Cafe


@admin.register(Cafe)
class CafeAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "address",
        "phone",
        "work_time",
    )
    search_fields = ("title", "address")