from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import Cafe
from .serializers import CafeSerializer


class CafeViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    authentication_classes = []
    queryset = Cafe.objects.all()
    serializer_class = CafeSerializer