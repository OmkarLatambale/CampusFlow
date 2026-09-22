from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination

from .models import Student
from .serializers import StudentSerializer
from django.shortcuts import get_object_or_404
from django.db.models import Q



class StudentListCreateView(APIView):

    def get(self, request):

        search = request.query_params.get('search')

        students = Student.objects.all()

        if search:
            students = students.filter(
                Q(name__icontains=search) |
                Q(email__icontains=search)
            )

        paginator = PageNumberPagination()

        students = paginator.paginate_queryset(
            students,
            request
    )

        serializer = StudentSerializer(
            students,
            many=True
        )

        return paginator.get_paginated_response(
            serializer.data
    )

    
    def post(self, request):
        serializer = StudentSerializer(
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class StudentDetailView(APIView):

    def get(self, request, id):
        student = get_object_or_404(Student, id=id)

        serializer = StudentSerializer(student)

        return Response(serializer.data)

    def put(self, request, id):
        
        student = get_object_or_404(Student, id=id)

        serializer = StudentSerializer(
            student,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def patch(self, request, id):

        student = get_object_or_404(Student, id=id)

        serializer = StudentSerializer(
            student,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, id):
        student = get_object_or_404(Student, id=id)

        student.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )