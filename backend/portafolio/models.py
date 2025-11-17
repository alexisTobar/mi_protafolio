# 'from django.db import models'
# Importa las herramientas de Django para construir la Base de Datos.
from django.db import models

# 'class Proyecto(models.Model):'
# Define el "molde" para un Proyecto. Django lo convertirá en una tabla SQL.
class Proyecto(models.Model):
    
    # 'titulo = models.CharField(...)'
    # Crea una columna de texto corto (un 'string') para el título.
    # 'max_length=200' es la regla: máximo 200 caracteres.
    titulo = models.CharField(max_length=200)
    
    # 'descripcion = models.TextField()'
    # Crea una columna de texto largo, sin límite, para la descripción.
    descripcion = models.TextField()
    
    # 'tecnologias = models.CharField(...)'
    # Un campo de texto corto para guardar las tecnologías (ej: "React, Django, Python").
    tecnologias = models.CharField(max_length=300)
    
    # 'link_github = models.URLField(...)'
    # Un campo especial que valida que el texto sea una URL (http://...).
    # 'blank=True, null=True' significa que este campo es OPCIONAL.
    link_github = models.URLField(max_length=200, blank=True, null=True)
    
    # --- ¡LA NUEVA ESTRATEGIA! ---
    # 'imagen_url = models.URLField(...)'
    # En lugar de un ImageField, guardamos la URL directa de la imagen (de Imgur).
    # Es solo un campo de texto que espera un link. ¡Simple y a prueba de fallos!
    imagen_url = models.URLField(max_length=500, blank=True, null=True)

    # 'def __str__(self):'
    # Esta es una función de Python.
    # Le dice a Django cómo "nombrar" a un proyecto en el Panel de Admin.
    # 'return self.titulo' -> Mostrará el título (ej: "Portafolio V2")
    # en lugar de "Proyecto object (1)".
    def __str__(self):
        return self.titulo

# --- Vamos a agregar tu Stack y CV ---

# 'class Tecnologia(models.Model):'
# Un molde para cada tecnología que dominas (Python, React, etc.).
class Tecnologia(models.Model):

    # 'nombre = models.CharField(max_length=100)'
    # El nombre que ve el usuario (ej: "Python")
    nombre = models.CharField(max_length=100)

    # 'icon_name = models.CharField(max_length=100)'
    # El nombre técnico del ícono (ej: "FaPython")
    icon_name = models.CharField(max_length=100)

    # --- ¡NUEVO CAMPO 'categoria'! ---

    # 'CATEGORIAS = [...]'
    # Definimos las "opciones" que podrá elegir el usuario en el Admin.
    # ('valor_guardado', 'valor_legible')
    CATEGORIAS = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('database', 'Base de Datos'),
        ('devops', 'DevOps/Producción'),
        ('other', 'Otra'),
    ]

    # 'categoria = models.CharField(...)'
    # Creamos la nueva columna en la base de datos.
    # 'choices=CATEGORIAS' -> Le dice a Django que muestre un menú desplegable.
    # 'default='other'' -> Si no elegimos nada, la pone como "Otra".
    categoria = models.CharField(
        max_length=50,
        choices=CATEGORIAS,
        default='other'
    )

    def __str__(self):
        return self.nombre

# 'class Perfil(models.Model):'
# Un molde para guardar tu descripción, tu CV y otra info.
class Perfil(models.Model):
    nombre_completo = models.CharField(max_length=200)
    bio_corta = models.CharField(max_length=255)
    bio_larga = models.TextField()
    
    # 'FileField' es para subir archivos (como tu PDF).
    # 'upload_to='cv/'' -> Django guardará el archivo en una carpeta 'cv'.
    # NOTA: Para que esto funcione en producción, también usaremos un truco.
    # Por ahora, lo dejamos así para el desarrollo local.
    cv = models.FileField(upload_to='cv/', blank=True, null=True)
    
    def __str__(self):
        return self.nombre_completo