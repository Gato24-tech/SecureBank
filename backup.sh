#!/bin/bash

# Crear carpeta backups si no existe
mkdir -p backups

# Copiar archivos clave
cp hardhat.config.mjs scripts/deploy.js frontend/public/deployments.json backups/

# Copiar carpeta scripts completa
cp -r scripts backups/

echo "✅ Copia de seguridad completada en la carpeta 'backups'."
