#!/bin/bash

echo "🖼️  Script d'Optimisation d'Images - DevAziss"
echo "=============================================="

# Vérifier si les outils sont installés
check_tools() {
    echo "🔍 Vérification des outils disponibles..."
    
    if command -v sharp &> /dev/null; then
        echo "✅ Sharp-CLI trouvé"
        TOOL="sharp"
    elif command -v convert &> /dev/null; then
        echo "✅ ImageMagick trouvé"
        TOOL="imagemagick"
    elif command -v cwebp &> /dev/null; then
        echo "✅ WebP tools trouvé"
        TOOL="webp"
    else
        echo "❌ Aucun outil d'optimisation trouvé"
        echo ""
        echo "📦 Installez un de ces outils :"
        echo "   npm install -g sharp-cli"
        echo "   brew install imagemagick"
        echo "   brew install webp"
        echo ""
        echo "🌐 Ou utilisez un outil en ligne :"
        echo "   https://squoosh.app/"
        echo "   https://tinypng.com/"
        exit 1
    fi
}

# Optimiser avec Sharp
optimize_with_sharp() {
    echo "🚀 Optimisation avec Sharp..."
    
    # Profile picture
    if [ -f "assets/images/ProPic.webp" ]; then
        echo "📸 Optimisation de ProPic.webp..."
        sharp -i assets/images/ProPic.webp -o assets/images/ProPic-optimized.webp --resize 400 400 --webp-quality 80
        echo "✅ ProPic.webp optimisé : ProPic-optimized.webp"
    fi
    
    # Screenshots des projets
    if [ -f "assets/projects/Kasa/Screenshot 2025-06-10 at 01.46.34.png" ]; then
        echo "📸 Optimisation du screenshot Kasa..."
        sharp -i "assets/projects/Kasa/Screenshot 2025-06-10 at 01.46.34.png" -o "assets/projects/Kasa/kasa-preview.webp" --resize 1200 --webp-quality 75
        echo "✅ Screenshot Kasa optimisé : kasa-preview.webp"
    fi
}

# Optimiser avec ImageMagick
optimize_with_imagemagick() {
    echo "🚀 Optimisation avec ImageMagick..."
    
    # Profile picture
    if [ -f "assets/images/ProPic.webp" ]; then
        echo "📸 Optimisation de ProPic.webp..."
        convert assets/images/ProPic.webp -resize 400x400 -quality 80 assets/images/ProPic-optimized.webp
        echo "✅ ProPic.webp optimisé : ProPic-optimized.webp"
    fi
    
    # Screenshots des projets
    if [ -f "assets/projects/Kasa/Screenshot 2025-06-10 at 01.46.34.png" ]; then
        echo "📸 Optimisation du screenshot Kasa..."
        convert "assets/projects/Kasa/Screenshot 2025-06-10 at 01.46.34.png" -resize 1200x -quality 75 "assets/projects/Kasa/kasa-preview.webp"
        echo "✅ Screenshot Kasa optimisé : kasa-preview.webp"
    fi
}

# Afficher les tailles avant/après
show_sizes() {
    echo ""
    echo "📊 Comparaison des tailles :"
    echo "=========================="
    
    if [ -f "assets/images/ProPic.webp" ] && [ -f "assets/images/ProPic-optimized.webp" ]; then
        original_size=$(du -h "assets/images/ProPic.webp" | cut -f1)
        optimized_size=$(du -h "assets/images/ProPic-optimized.webp" | cut -f1)
        echo "ProPic.webp : $original_size → $optimized_size"
    fi
    
    if [ -f "assets/projects/Kasa/Screenshot 2025-06-10 at 01.46.34.png" ] && [ -f "assets/projects/Kasa/kasa-preview.webp" ]; then
        original_size=$(du -h "assets/projects/Kasa/Screenshot 2025-06-10 at 01.46.34.png" | cut -f1)
        optimized_size=$(du -h "assets/projects/Kasa/kasa-preview.webp" | cut -f1)
        echo "Screenshot Kasa : $original_size → $optimized_size"
    fi
}

# Instructions manuelles
show_manual_instructions() {
    echo ""
    echo "📋 INSTRUCTIONS MANUELLES"
    echo "========================"
    echo ""
    echo "Si les outils automatiques ne fonctionnent pas, utilisez ces sites :"
    echo ""
    echo "1. 🌐 Squoosh (Google) - https://squoosh.app/"
    echo "   - Glissez-déposez votre image"
    echo "   - Choisissez WebP, qualité 80"
    echo "   - Redimensionnez à 400x400 (ProPic) ou 1200px largeur (screenshots)"
    echo ""
    echo "2. 🌐 TinyPNG - https://tinypng.com/"
    echo "   - Optimisation automatique"
    echo "   - Puis convertir en WebP avec Squoosh"
    echo ""
    echo "3. 🌐 Compressor.io - https://compressor.io/"
    echo "   - Compression sans perte de qualité"
    echo ""
    echo "📁 Fichiers à optimiser :"
    echo "   - assets/images/ProPic.webp (379KB → ~50KB)"
    echo "   - assets/projects/Kasa/Screenshot 2025-06-10 at 01.46.34.png (3.4MB → ~200KB)"
}

# Exécution principale
main() {
    check_tools
    
    case $TOOL in
        "sharp")
            optimize_with_sharp
            ;;
        "imagemagick")
            optimize_with_imagemagick
            ;;
        *)
            show_manual_instructions
            exit 0
            ;;
    esac
    
    show_sizes
    
    echo ""
    echo "✅ Optimisation terminée !"
    echo ""
    echo "📝 Prochaines étapes :"
    echo "1. Remplacez les anciennes images par les nouvelles dans votre HTML"
    echo "2. Testez votre site pour vérifier que tout fonctionne"
    echo "3. Supprimez les anciennes images si tout est OK"
}

# Lancer le script
main 