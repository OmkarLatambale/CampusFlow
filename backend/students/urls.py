from django.urls import path
from .views import StudentListCreateView
from .views import StudentDetailView

urlpatterns = [
    path(
        'students/',
        StudentListCreateView.as_view(),
        name='student-list'
    ),
    path('students/<int:id>/',StudentDetailView.as_view(),name='student-details')
]
