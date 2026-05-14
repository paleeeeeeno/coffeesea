from django.db import models


class Cafe(models.Model):
    title = models.CharField("Название", max_length=150)
    address = models.CharField("Адрес", max_length=255)
    phone = models.CharField("Телефон", max_length=50)
    work_time = models.CharField("График работы", max_length=120)
    map_link = models.URLField("Ссылка на карту", blank=True)

    image = models.ImageField(
        "Фото кофейни",
        upload_to="cafes/",
        blank=True,
        null=True
    )

    latitude = models.FloatField("Широта", blank=True, null=True)
    longitude = models.FloatField("Долгота", blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Кофейня"
        verbose_name_plural = "Кофейни"
        ordering = ["title"]

    def __str__(self):
        return self.title