from decimal import Decimal

from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import Order, BonusAccount
from .serializers import OrderSerializer, BonusAccountSerializer


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        total = serializer.validated_data.get("total_price", Decimal("0"))
        earned = int(total * Decimal("0.05"))

        order = serializer.save(
            user=self.request.user,
            bonus_earned=earned
        )

        bonus_account, _ = BonusAccount.objects.get_or_create(
            user=self.request.user
        )
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