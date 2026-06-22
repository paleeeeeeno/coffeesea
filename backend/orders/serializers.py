from rest_framework import serializers
from .models import Order, OrderItem, BonusAccount


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = [
            "id",
            "product",
            "size",
            "modifiers",
            "quantity",
            "final_price",
        ]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "user",
            "delivery_type",
            "address",
            "cafe_address",
            "status",
            "total_price",
            "bonus_earned",
            "created_at",
            "items",
        ]
        read_only_fields = [
            "user",
            "status",
            "bonus_earned",
            "created_at",
        ]

    def create(self, validated_data):
        items_data = validated_data.pop("items", [])

        order = Order.objects.create(**validated_data)

        for item_data in items_data:
            modifiers = item_data.pop("modifiers", [])

            order_item = OrderItem.objects.create(
                order=order,
                **item_data
            )

            order_item.modifiers.set(modifiers)

        return order


class BonusAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = BonusAccount
        fields = ["points"]