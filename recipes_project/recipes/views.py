from rest_framework import viewsets
from .models import Category, Recipe
from .serializers import CategorySerializer, RecipeSerializer
from rest_framework.decorators import api_view

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class RecipeViewSet(viewsets.ModelViewSet):
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)
        return queryset

@api_view(['GET'])
def category_view(request):
    if request.method == 'GET':
        dishes = Category.objects.filter(categoryType=request.query_params['category'])
        serializer = CategorySerializer(dishes, many=True)
        return Response(serializer.data)
