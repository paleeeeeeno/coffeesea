from django.contrib import admin
from .models import Category, Product, ProductSize, Modifier


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "slug")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Modifier)
class ModifierAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "type", "price")
    list_filter = ("type",)
    search_fields = ("name",)


class ProductSizeInline(admin.TabularInline):
    model = ProductSize
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "category",
        "base_price",
        "is_available",
        "is_popular",
    )
    list_filter = ("category", "is_available", "is_popular")
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}
    filter_horizontal = ("modifiers",)
    inlines = [ProductSizeInline]