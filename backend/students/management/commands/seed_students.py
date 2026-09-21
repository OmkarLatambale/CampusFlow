from django.core.management.base import BaseCommand
from students.models import Student


class Command(BaseCommand):

    help = "Creates sample student data"

    def handle(self, *args, **kwargs):

        students = [
            {
                "name": "Aarav Sharma",
                "email": "aarav@gmail.com",
                "age": 21,
                "phone": "9876500001"
            },
            {
                "name": "Rohan Patil",
                "email": "rohan@gmail.com",
                "age": 22,
                "phone": "9876500002"
            },
            {
                "name": "Priya Deshmukh",
                "email": "priya@gmail.com",
                "age": 20,
                "phone": "9876500003"
            },
            {
                "name": "Sneha Kulkarni",
                "email": "sneha@gmail.com",
                "age": 23,
                "phone": "9876500004"
            },
            {
                "name": "Aditya Joshi",
                "email": "aditya@gmail.com",
                "age": 21,
                "phone": "9876500005"
            },
            {
                "name": "Neha Patil",
                "email": "neha@gmail.com",
                "age": 22,
                "phone": "9876500006"
            },
            {
                "name": "Vikram Singh",
                "email": "vikram@gmail.com",
                "age": 24,
                "phone": "9876500007"
            },
            {
                "name": "Ananya Mehta",
                "email": "ananya@gmail.com",
                "age": 20,
                "phone": "9876500008"
            },
            {
                "name": "Kunal Shah",
                "email": "kunal@gmail.com",
                "age": 23,
                "phone": "9876500009"
            },
            {
                "name": "Isha Gupta",
                "email": "isha@gmail.com",
                "age": 21,
                "phone": "9876500010"
            },
            {
                "name": "Rahul Verma",
                "email": "rahul@gmail.com",
                "age": 22,
                "phone": "9876500011"
            },
            {
                "name": "Meera Nair",
                "email": "meera@gmail.com",
                "age": 20,
                "phone": "9876500012"
            },
            {
                "name": "Sahil More",
                "email": "sahil@gmail.com",
                "age": 24,
                "phone": "9876500013"
            },
            {
                "name": "Pooja Joshi",
                "email": "pooja@gmail.com",
                "age": 22,
                "phone": "9876500014"
            },
            {
                "name": "Arjun Kapoor",
                "email": "arjun@gmail.com",
                "age": 23,
                "phone": "9876500015"
            }
        ]

        for student_data in students:
            Student.objects.get_or_create(
                email=student_data["email"],
                defaults=student_data
            )

        self.stdout.write(
            self.style.SUCCESS("15 sample students created successfully!")
        )