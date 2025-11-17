#!/usr/bin/env bash
# Le dice al script que se detenga si un comando falla
set -o errexit

# 1. Instala todas las dependencias (desde requirements.txt)
pip install -r requirements.txt

# 2. Recolecta los archivos estáticos (el CSS/JS del Admin)
# Usamos 'python3' porque los servidores de Render usan Linux
python3 manage.py collectstatic --no-input

# 3. Aplica las migraciones de la base de datos
python3 manage.py migrate

# --- ¡LÍNEA NUEVA! ---
# Le dice a Django: "Crea el superusuario usando las variables de entorno"
# El '--no-input' es clave.
# El '|| echo ...' es un truco para que no falle si el usuario ya existe.
python3 manage.py createsuperuser --no-input || echo "El Superusuario ya existe."