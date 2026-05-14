from rest_framework import serializers
from .models import Category, Product, ProductSize, Modifier


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ModifierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modifier
        fields = "__all__"


class ProductSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSize
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    sizes = ProductSizeSerializer(many=True)
    modifiers = ModifierSerializer(many=True)

    class Meta:
        model = Product
        fields = "__all__"