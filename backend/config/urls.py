from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from accounts.views import RegisterView
from menu.views import CategoryViewSet, ProductViewSet, ModifierViewSet
from cafes.views import CafeViewSet
from orders.views import OrderViewSet, BonusViewSet
from feedback.views import FeedbackMessageViewSet


router = DefaultRouter()
router.register("categories", CategoryViewSet)
router.register("products", ProductViewSet)
router.register("modifiers", ModifierViewSet)
router.register("cafes", CafeViewSet)
router.register("orders", OrderViewSet, basename="orders")
router.register("bonus", BonusViewSet, basename="bonus")
router.register("feedback", FeedbackMessageViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/", include(router.urls)),

    path("api/auth/register/", RegisterView.as_view(), name="register"),
    path("api/auth/login/", TokenObtainPairView.as_view(), name="login"),
    path("api/auth/refresh/", TokenRefreshView.as_view(), name="refresh"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)