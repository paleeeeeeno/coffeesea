from django.db import models


class Category(models.Model):
    name = models.CharField("Категория", max_length=120)
    slug = models.SlugField("URL", unique=True)

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

    def __str__(self):
        return self.name


class Modifier(models.Model):
    TYPES = [
        ("syrup", "Сироп"),
        ("option", "Опция"),
        ("extra", "Добавка"),
    ]

    name = models.CharField("Название", max_length=120)
    type = models.CharField("Тип", max_length=20, choices=TYPES)
    price = models.DecimalField("Цена", max_digits=8, decimal_places=2, default=0)

    class Meta:
        verbose_name = "Модификатор"
        verbose_name_plural = "Модификаторы"

    def __str__(self):
        return f"{self.name} +{self.price}₽"


class Product(models.Model):
    name = models.CharField("Название", max_length=120)
    slug = models.SlugField("URL", unique=True)
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        verbose_name="Категория"
    )
    description = models.TextField("Описание")
    image = models.ImageField(
        "Фото",
        upload_to="products/",
        blank=True,
        null=True
    )
    base_price = models.DecimalField(
        "Базовая цена",
        max_digits=8,
        decimal_places=2
    )
    is_available = models.BooleanField("В наличии", default=True)
    is_popular = models.BooleanField("Популярный товар", default=False)
    modifiers = models.ManyToManyField(
        Modifier,
        blank=True,
        verbose_name="Модификаторы"
    )

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"

    def __str__(self):
        return self.name


class ProductSize(models.Model):
    product = models.ForeignKey(
        Product,
        related_name="sizes",
        on_delete=models.CASCADE,
        verbose_name="Товар"
    )
    name = models.CharField("Размер", max_length=50)
    volume_ml = models.PositiveIntegerField("Объем, мл", blank=True, null=True)
    price = models.DecimalField("Цена", max_digits=8, decimal_places=2)

    class Meta:
        verbose_name = "Размер товара"
        verbose_name_plural = "Размеры товаров"

    def __str__(self):
        return f"{self.product.name} — {self.name}"