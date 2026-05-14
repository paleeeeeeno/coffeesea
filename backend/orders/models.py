from django.conf import settings
from django.db import models
from menu.models import Product, ProductSize, Modifier


class BonusAccount(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    points = models.PositiveIntegerField("Бонусы", default=0)

    class Meta:
        verbose_name = "Бонусный счет"
        verbose_name_plural = "Бонусные счета"

    def __str__(self):
        return f"{self.user.username}: {self.points}"


class Order(models.Model):
    DELIVERY_TYPES = [
        ("pickup", "Самовывоз"),
        ("delivery", "Доставка"),
    ]

    STATUSES = [
        ("new", "Новый"),
        ("cooking", "Готовится"),
        ("done", "Готов"),
        ("cancelled", "Отменен"),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    delivery_type = models.CharField(
        "Тип получения",
        max_length=20,
        choices=DELIVERY_TYPES
    )
    address = models.CharField("Адрес доставки", max_length=255, blank=True)
    cafe_address = models.CharField("Адрес кофейни", max_length=255, blank=True)
    status = models.CharField("Статус", max_length=20, choices=STATUSES, default="new")
    total_price = models.DecimalField("Сумма", max_digits=10, decimal_places=2)
    bonus_earned = models.PositiveIntegerField("Начислено бонусов", default=0)
    created_at = models.DateTimeField("Дата заказа", auto_now_add=True)

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"
        ordering = ["-created_at"]

    def __str__(self):
        return f"Заказ #{self.id}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    size = models.ForeignKey(ProductSize, null=True, blank=True, on_delete=models.PROTECT)
    modifiers = models.ManyToManyField(Modifier, blank=True)
    quantity = models.PositiveIntegerField("Количество", default=1)
    final_price = models.DecimalField("Цена", max_digits=10, decimal_places=2)

    class Meta:
        verbose_name = "Товар в заказе"
        verbose_name_plural = "Товары в заказе"

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"