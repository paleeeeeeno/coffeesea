from django.contrib import admin
from .models import Order, OrderItem, BonusAccount


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    filter_horizontal = ("modifiers",)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "delivery_type",
        "status",
        "total_price",
        "bonus_earned",
        "created_at",
    )
    list_filter = ("status", "delivery_type")
    inlines = [OrderItemInline]


@admin.register(BonusAccount)
class BonusAccountAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "points")