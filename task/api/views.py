from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view


from .models import Task
from .serializers import TaskSerializer


# list view
@api_view(['GET'])
def api_get_view(request):
  qs = Task.objects.all().order_by('-id')
  serializer = TaskSerializer(qs, many=True)
  return Response(serializer.data)

# create task view
@api_view(['POST'])
def api_post_view(request):
  serializer = TaskSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
  return Response(serializer.data)

# update task view
@api_view(['PUT'])
def api_put_view(request, pk):
  obj = Task.objects.get(id=pk)
  serializer = TaskSerializer(instance=obj, data=request.data)
  if serializer.is_valid():
    serializer.save()
  return Response(serializer.data)

# delete task view
@api_view(['DELETE'])
def api_delete_view(request, pk):
  obj = Task.objects.get(id=pk)
  obj.delete()
  return Response('Task deleted!')