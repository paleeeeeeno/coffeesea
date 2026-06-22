from decimal import Decimal

from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import serializers

from .models import Order, BonusAccount
from .serializers import OrderSerializer, BonusAccountSerializer


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        total = serializer.validated_data.get("total_price", Decimal("0"))
        bonus_spent = serializer.validated_data.get("bonus_spent", 0)

        bonus_account, _ = BonusAccount.objects.get_or_create(
            user=self.request.user
        )

        if bonus_spent > bonus_account.points:
            raise serializers.ValidationError(
                {"bonus_spent": "Недостаточно бонусов для списания"}
            )

        if Decimal(bonus_spent) > total:
            raise serializers.ValidationError(
                {"bonus_spent": "Нельзя списать больше суммы заказа"}
            )

        final_total = total - Decimal(bonus_spent)
        earned = int(final_total * Decimal("0.05"))

        order = serializer.save(
            user=self.request.user,
            total_price=final_total,
            bonus_spent=bonus_spent,
            bonus_earned=earned
        )

        bonus_account.points -= bonus_spent
        bonus_account.points += earned
        bonus_account.save()

        return order

    @action(detail=False, methods=["get"])
    def history(self, request):
        orders = self.get_queryset()
        serializer = self.get_serializer(orders, many=True)
        return Response(serializer.data)


class BonusViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        bonus_account, _ = BonusAccount.objects.get_or_create(
            user=request.user
        )
        serializer = BonusAccountSerializer(bonus_account)
        return Response(serializer.data)