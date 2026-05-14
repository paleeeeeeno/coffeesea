from django.db import models


class FeedbackMessage(models.Model):
    name = models.CharField("Имя", max_length=120)
    email = models.EmailField("Email")
    phone = models.CharField("Телефон", max_length=50, blank=True)
    message = models.TextField("Сообщение")
    created_at = models.DateTimeField("Дата", auto_now_add=True)

    class Meta:
        verbose_name = "Сообщение"
        verbose_name_plural = "Обратная связь"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} — {self.email}"