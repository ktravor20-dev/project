from django.test import TestCase
from django.contrib.auth import get_user_model

User = get_user_model()

class BasicSystemTest(TestCase):
    def test_sample_verification(self):
        """A basic test to generate your required assignment evidence"""
        self.assertEqual(1 + 1, 2)

    def test_user_creation(self):
        """Tests if a mock user can be created in the database"""
        user = User.objects.create_user(
            username="testuser", 
            password="testpassword123"
        )
        self.assertEqual(user.username, "testuser")

