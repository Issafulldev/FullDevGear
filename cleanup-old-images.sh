#!/bin/bash

echo "🧹 Script de Nettoyage des Anciennes Images"
echo "==========================================="

# Liste des anciennes images à supprimer
OLD_IMAGES=(
    "assets/images/ProPic.webp"
    "assets/projects/Kasa/Screenshot 2025-06-10 at 01.46.34.png"
    "assets/projects/Kanap/Screenshot 2025-06-10 at 01.55.09.png"
    "assets/projects/FullDevGear/Screenshot 2025-06-10 at 02.02.18.png"
)

echo "⚠️  ATTENTION: Ce script va supprimer les anciennes images volumineuses."
echo "Assurez-vous que votre site fonctionne correctement avec les nouvelles images optimisées."
echo ""
echo "Images qui seront supprimées :"

total_size=0
for img in "${OLD_IMAGES[@]}"; do
    if [ -f "$img" ]; then
        size=$(du -h "$img" | cut -f1)
        size_bytes=$(du -b "$img" | cut -f1)
        total_size=$((total_size + size_bytes))
        echo "  - $img ($size)"
    fi
done

total_size_mb=$((total_size / 1024 / 1024))
echo ""
echo "💾 Espace total qui sera libéré : ${total_size_mb}MB"
echo ""

read -p "Voulez-vous continuer ? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗑️  Suppression en cours..."
    
    for img in "${OLD_IMAGES[@]}"; do
        if [ -f "$img" ]; then
            echo "Suppression de $img"
            rm "$img"
        else
            echo "⚠️  $img n'existe pas"
        fi
    done
    
    echo ""
    echo "✅ Nettoyage terminé !"
    echo "💾 ${total_size_mb}MB d'espace libéré"
else
    echo "❌ Nettoyage annulé"
fi 