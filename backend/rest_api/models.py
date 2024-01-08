from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

class UserManager(BaseUserManager):
    def create_user(self, username, password, **extra_fields):
        if not username:
            raise ValueError("Username should be provided")
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, password, **extra_fields)

class User(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    mobile_number = models.CharField(max_length=15)
    password = models.CharField(max_length=100)
    is_candidate = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    objects = UserManager()

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

class Education(models.Model):
    education = models.CharField(max_length=255)
    boardUniversity = models.CharField(max_length=255)
    passingYear = models.PositiveIntegerField()
    percentage = models.FloatField()

class Experience(models.Model):
    organization = models.CharField(max_length=255)
    years = models.PositiveIntegerField()
    remarks = models.TextField()

class ApplicantInformation(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    post = models.CharField(max_length=255)
    applicantName = models.CharField(max_length=255)
    fatherName = models.CharField(max_length=255)
    dob = models.DateField()
    correspondentAddress = models.TextField()
    permanentAddress = models.TextField()
    mobileNumber = models.CharField(max_length=15)
    email = models.EmailField()
    nationality = models.CharField(max_length=255)
    education = models.JSONField()
    experience = models.JSONField()
    category = models.CharField(max_length=255)
    gender = models.CharField(max_length=10)
    isPhysicallyChallenged = models.BooleanField()
    application_number = models.CharField(max_length=255, unique=True, default=None)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    signature = models.ImageField(upload_to='signatures/', blank=True, null=True)
    declaration = models.BooleanField()

    def __str__(self):
        return f"{self.applicantName}'s Application Information"

    def save(self, *args, **kwargs):
        if not self.application_number:
            # Generate a unique application number using some logic
            # For example: post + user.id + applicantName
            self.application_number = f"{self.post}_{self.user.id}_{self.applicantName}"
        super().save(*args, **kwargs)
