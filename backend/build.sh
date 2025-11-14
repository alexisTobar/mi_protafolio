#!/usr/-bin/env bash
# exit on error
set -o errexit

# 1. Instala las dependencias
pip install -r requirements.txt

# 2. Recolecta los archivos estáticos (el CSS/JS del Admin)
python manage.py collectstatic --no-input

# 3. Aplica las migraciones de la base de datos
python manage.py migrate

# 4. Crea el superusuario (¡NUEVA LÍNEA!)
# Usará las variables de entorno que pusiste en Render
python manage.py createsuperuser --no-input || echo "Superuser already exists"