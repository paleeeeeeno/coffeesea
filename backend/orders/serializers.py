from rest_framework import serializers
from .models import Order, OrderItem, BonusAccount


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = "__all__"
        read_only_fields = ["user", "bonus_earned"]


class BonusAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = BonusAccount
        fields = ["points"]