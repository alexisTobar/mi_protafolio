#!/usr/bin/env bash
# exit on error
set -o errexit

# 1. Instala las dependencias
pip install -r requirements.txt

# 2. Recolecta los archivos estáticos (¡usando python3!)
python3 manage.py collectstatic --no-input

# 3. Aplica las migraciones (¡usando python3!)
python3 manage.py migrate

# 4. Crea el superusuario (¡usando python3!)
python3 manage.py createsuperuser --no-input || echo "Superuser already exists"