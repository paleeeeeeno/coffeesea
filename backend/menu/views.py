from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import Category, Product, Modifier
from .serializers import CategorySerializer, ProductSerializer, ModifierSerializer


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    authentication_classes = []
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    authentication_classes = []

    queryset = (
        Product.objects
        .filter(is_available=True)
        .select_related("category")
        .prefetch_related("sizes", "modifiers")
    )
    serializer_class = ProductSerializer

    @action(
        detail=False,
        methods=["get"],
        permission_classes=[AllowAny],
        authentication_classes=[],
    )
    def popular(self, request):
        products = self.get_queryset().filter(is_popular=True)[:4]
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)


class ModifierViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    authentication_classes = []
    queryset = Modifier.objects.all()
    serializer_class = ModifierSerializer