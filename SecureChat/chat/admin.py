from django.contrib import admin

# Register your models here.
from .models import *
admin.site.register(user)
admin.site.register(messages_to_process)
admin.site.register(messages_processed)
admin.site.register(liveUsers)
admin.site.register(publickeys)