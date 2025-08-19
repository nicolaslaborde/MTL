# Script PowerShell pour sauvegarder le projet sur GitHub

# Configuration
$repositoryUrl = "https://github.com/<ton-utilisateur>/MemoryTimeLine.git"  # Remplace par l'URL de ton dépôt GitHub
$branch = "main"

# Initialiser le dépôt Git (si ce n'est pas déjà fait)
if (-not (Test-Path ".git")) {
    git init
    git branch -M $branch
    git remote add origin $repositoryUrl
}

# Ajouter tous les fichiers
Write-Host "Ajout des fichiers au suivi Git..."
git add .

# Commit des modifications
$date = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$message = "Sauvegarde automatique : $date"
Write-Host "Création du commit : $message"
git commit -m $message

# Pousser les modifications sur GitHub
Write-Host "Envoi des modifications sur GitHub..."
git push -u origin $branch

Write-Host "Sauvegarde terminée avec succès !"
