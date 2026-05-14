from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import FeedbackMessage
from .serializers import FeedbackMessageSerializer


class FeedbackMessageViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = FeedbackMessage.objects.all()
    serializer_class = FeedbackMessageSerializer