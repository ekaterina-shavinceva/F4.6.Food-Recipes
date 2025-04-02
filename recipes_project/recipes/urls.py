from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, RecipeViewSet, category_view

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'recipes', RecipeViewSet)

urlpatterns = [
   path('', include(router.urls)),
   path('category-filter/', category_view, name='category-filter'),
   path('categories/', CategoryViewSet.as_view({'get': 'list'}), name='categories'),
]

