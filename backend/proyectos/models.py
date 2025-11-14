from django.db import models

class Proyecto(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    tecnologias = models.CharField(max_length=300, help_text="Ej: React, Python, Django")
    link_github = models.URLField(blank=True, null=True)
    link_demo = models.URLField(blank=True, null=True)
    # 'upload_to' crea una carpeta 'imagenes_proyectos' para organizar
    imagen = models.ImageField(upload_to='imagenes_proyectos/', blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo
