from rest_framework import serializers
from .models import FeedbackMessage


class FeedbackMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedbackMessage
        fields = "__all__"