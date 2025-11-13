# 🛒 Guide Complet - Panier & Ordonnance

## ✅ Ce qui a été implémenté

### 1. **API Service** (`src/api/services/marketPlace.js`)
Deux nouveaux endpoints ajoutés :
- ✅ `uploadOrdonnance(pharmacieId, file)` - Upload d'ordonnance (multipart/form-data)
- ✅ `createPanier(panierData)` - Création du panier/commande (JSON)

### 2. **Store Pinia** (`src/store/cart/cartStore.js`)
Store centralisé pour gérer le panier :
- Items du panier avec quantités
- ID et nom de la pharmacie
- ID de l'ordonnance uploadée
- Informations client (nom, prénom, tel WhatsApp)
- Calculs automatiques (total, nombre d'articles)

### 3. **Composable** (`src/composables/marketPlace/useCart.js`)
Logique métier pour :
- Sélection et preview d'ordonnance
- Upload avec confirmation
- Soumission de commande
- Gestion d'erreurs

### 4. **Modal de Preview** (`src/components/marketplace/OrdonnancePreviewModal.vue`)
Modal moderne pour :
- Prévisualisation d'image (JPEG, PNG, WEBP)
- Prévisualisation de PDF
- Confirmation utilisateur (Oui/Non)
- État de chargement pendant l'upload

### 5. **OrderForm amélioré** (`src/components/marketplace/OrderForm.vue`)
Formulaire complet avec :
- Liste des produits dans le panier (depuis le store)
- Contrôles de quantité (+/-)
- Upload d'ordonnance avec preview
- Formulaire d'informations client
- Total calculé automatiquement
- Bouton de soumission

### 6. **PharmacyDetails mis à jour**
Intégration du store et passage des informations nécessaires

---

## 🎯 Flow Complet de l'Utilisateur

```
1. Utilisateur arrive sur PharmacyDetails
   ↓
2. Navigue dans la liste des produits
   ↓
3. Clique sur "Ajouter" sur un produit
   ├─ Produit ajouté au store (cartStore)
   ├─ Affichage dans le panier à droite
   └─ Compteur mis à jour
   ↓
4. [OPTIONNEL] Upload d'ordonnance
   ├─ Clic sur "Cliquez pour télécharger"
   ├─ Sélection du fichier (image ou PDF)
   ├─ Preview automatique dans un modal
   ├─ Demande de confirmation : "Est-ce la bonne ordonnance ?"
   │  ├─ NON → Annule, peut recommencer
   │  └─ OUI → Upload vers l'API
   ├─ Récupération de l'ID ordonnance
   └─ Sauvegarde dans le store (cartStore.ordonnanceId)
   ↓
5. Remplir les informations client
   ├─ Nom
   ├─ Prénom
   └─ Téléphone WhatsApp
   ↓
6. Clic sur "Commander maintenant"
   ├─ Validation des champs obligatoires
   ├─ Préparation des données (getPanierData)
   ├─ Soumission à l'API (POST /paniers/create)
   ├─ Réponse de l'API
   └─ Modal de succès
   ↓
7. Panier vidé automatiquement après succès
```

---

## 📦 Structure des Données

### Données envoyées à l'API (POST /paniers/create)
```javascript
{
  lignePanierDto: [
    {
      produitPharmacieId: "PPHA-1762950469377-470",
      productName: "Concentré de bicarbonate",
      quantite: 2,
      prixUnitaire: 1500,
      sousTotal: 3000
    },
    // ... autres produits
  ],
  pharmacieId: "PHA-1760634968722-454",
  livreurId: "", // Optionnel
  ordonnanceId: "ORD-1763045719615-252", // ID de l'ordonnance uploadée
  total: 3000,
  nom: "Diallo",
  prenom: "Mamadou",
  telWathsApp: "+243 81 234 5678"
}
```

### Réponse API Upload Ordonnance (POST /paniers/upload)
```javascript
{
  status: "SUCCESS",
  message: "Ordonnance créée avec succès",
  body: {
    id: "ORD-1763045719615-252", // ← Sauvegardé dans le store
    data: "/9j/4AAQSkZJRgABAAEAYABgAAD...", // Base64 pour preview
    code: "2025111314551961386085",
    utilisateurId: "USER-1759307441354-952",
    pharmacieId: "PHA-1760634968722-454",
    etat: "PENDING",
    createAt: "2025-11-13T14:55:19.614105441",
    deleted: false
  }
}
```

---

## 🧪 Comment Tester

### Étape 1 : Démarrer l'application
```bash
npm run dev
```

### Étape 2 : Naviguer vers une pharmacie
1. Aller sur http://localhost:5173/marketplace
2. Cliquer sur une pharmacie

### Étape 3 : Ajouter des produits au panier
1. Parcourir la liste de produits
2. Cliquer sur le bouton "+" sur plusieurs produits
3. Vérifier que le panier à droite se remplit
4. Vérifier que le total se met à jour

### Étape 4 : Tester l'upload d'ordonnance

#### Test 1 : Upload avec confirmation
1. Cliquer sur "Cliquez pour télécharger"
2. Sélectionner une image (JPEG/PNG)
3. **Modal de preview s'affiche automatiquement**
4. Vérifier que l'image est visible dans le modal
5. Cliquer sur "Oui, confirmer et envoyer"
6. Attendre le message "Ordonnance envoyée"
7. Vérifier que l'ID s'affiche dans le panier

#### Test 2 : Annulation
1. Sélectionner un fichier
2. Modal s'affiche
3. Cliquer sur "Non, annuler"
4. Vérifier que le modal se ferme
5. Vérifier qu'aucune ordonnance n'est uploadée

#### Test 3 : Fichier invalide
1. Essayer d'uploader un fichier .txt ou .doc
2. Vérifier le message d'erreur : "Format de fichier non supporté"

#### Test 4 : Fichier trop volumineux
1. Essayer d'uploader un fichier > 5MB
2. Vérifier le message d'erreur : "Le fichier est trop volumineux"

### Étape 5 : Remplir le formulaire
1. Entrer un nom
2. Entrer un prénom
3. Entrer un numéro WhatsApp

### Étape 6 : Commander
1. Cliquer sur "Commander maintenant"
2. Vérifier le spinner "Envoi en cours..."
3. Attendre la réponse de l'API
4. Vérifier le modal de succès

### Étape 7 : Vérifier dans la console (F12)
```
🛒 Produit ajouté au panier: Concentré de bicarbonate x 1
📄 Fichier ordonnance sélectionné: ordonnance.jpg image/jpeg 245.32KB
📤 Upload de l'ordonnance en cours...
✅ Ordonnance uploadée avec succès: ORD-xxx
📤 Soumission de la commande...
📦 Données du panier: {...}
✅ Commande créée avec succès: {...}
🛒 Panier vidé
```

---

## 🔍 Logs à Vérifier

### Ajout au panier
```
🛒 Produit ajouté au panier: Concentré de bicarbonate x 1
🏥 Pharmacie définie: ABDOU AZIZ SY
```

### Upload ordonnance
```
📄 Fichier ordonnance sélectionné: ordonnance.jpg image/jpeg 245.32KB
📤 Upload de l'ordonnance en cours...
✅ Ordonnance uploadée avec succès: ORD-1763045719615-252
📄 Ordonnance enregistrée: ORD-1763045719615-252
```

### Soumission commande
```
👤 Informations client enregistrées
📤 Soumission de la commande...
📦 Données du panier: {
  lignePanierDto: [...],
  pharmacieId: "PHA-xxx",
  ordonnanceId: "ORD-xxx",
  total: 3000,
  nom: "Diallo",
  prenom: "Mamadou",
  telWathsApp: "+243 81 234 5678"
}
✅ Commande créée avec succès: {...}
🛒 Panier vidé
```

---

## 🎨 Fonctionnalités du Panier

### Gestion des quantités
- **Bouton +** : Augmente la quantité (max = stock disponible)
- **Bouton -** : Diminue la quantité (min = 1)
- **Bouton X** : Retire complètement le produit du panier

### Calculs automatiques
- `sousTotal` = `prixUnitaire` × `quantite` (par produit)
- `total` = Somme de tous les sousTotal

### Ordonnance
- **Statut** : Affiche "Ordonnance envoyée" avec l'ID si uploadée
- **Bouton "Retirer"** : Supprime l'ordonnance du panier
- **Optionnelle** : On peut commander sans ordonnance

---

## 🛠️ API Endpoints Utilisés

### 1. Upload Ordonnance
```http
POST /kenea/api/v3/paniers/upload?pharmacieId=PHA-xxx
Content-Type: multipart/form-data
Authorization: Bearer TOKEN

Body:
  file: [binary]
```

**Réponse :**
```json
{
  "status": "SUCCESS",
  "message": "Ordonnance créée avec succès",
  "body": {
    "id": "ORD-xxx",
    "data": "base64...",
    "pharmacieId": "PHA-xxx",
    "etat": "PENDING"
  }
}
```

### 2. Créer Panier/Commande
```http
POST /kenea/api/v3/paniers/create
Content-Type: application/json
Authorization: Bearer TOKEN

Body:
{
  "lignePanierDto": [...],
  "pharmacieId": "string",
  "ordonnanceId": "string",
  "total": 0,
  "nom": "string",
  "prenom": "string",
  "telWathsApp": "string"
}
```

---

## 🐛 Problèmes Possibles et Solutions

### Problème 1 : "ID de pharmacie manquant"
**Cause** : La pharmacie n'est pas définie dans le store
**Solution** : Vérifier que `pharmacy.id` et `pharmacy.nom` sont bien passés au `OrderForm`

### Problème 2 : "Veuillez remplir tous les champs obligatoires"
**Cause** : Un des champs (nom, prénom, tel) est vide
**Solution** : Remplir tous les champs avant de commander

### Problème 3 : Modal ne s'affiche pas
**Cause** : Fichier non reconnu ou erreur de lecture
**Solution** : Vérifier le type de fichier (doit être image/* ou .pdf)

### Problème 4 : "Format de fichier non supporté"
**Cause** : Type MIME non accepté
**Solution** : Utiliser JPEG, PNG, WEBP ou PDF uniquement

### Problème 5 : Panier vide après ajout produit
**Cause** : Store Pinia non initialisé
**Solution** : Vérifier que le store est bien importé et utilisé

---

## 📝 Checklist de Validation

- [ ] Produits s'ajoutent au panier
- [ ] Quantités peuvent être modifiées (+/-)
- [ ] Produits peuvent être retirés (X)
- [ ] Total se calcule correctement
- [ ] Upload d'ordonnance ouvre le modal
- [ ] Preview d'image fonctionne
- [ ] Preview de PDF fonctionne
- [ ] Bouton "Non, annuler" ferme le modal
- [ ] Bouton "Oui, confirmer" upload l'ordonnance
- [ ] ID de l'ordonnance s'affiche après upload
- [ ] Bouton "Retirer" supprime l'ordonnance
- [ ] Champs obligatoires sont validés
- [ ] Bouton "Commander" affiche le spinner
- [ ] Commande est créée dans l'API
- [ ] Modal de succès s'affiche
- [ ] Panier est vidé après succès
- [ ] Logs apparaissent dans la console

---

## 🚀 Prochaines Améliorations Possibles

1. **Validation WhatsApp** : Vérifier le format du numéro
2. **Historique** : Afficher l'historique des commandes
3. **Notifications** : Notifier l'utilisateur par WhatsApp
4. **Paiement** : Intégrer un système de paiement
5. **Suivi** : Suivre l'état de la commande
6. **Multi-pharmacies** : Commander depuis plusieurs pharmacies
7. **Favoris** : Sauvegarder des ordonnances fréquentes
8. **OCR** : Extraire automatiquement les produits de l'ordonnance

---

## 📚 Fichiers Créés/Modifiés

### Créés
- `src/store/cart/cartStore.js` - Store Pinia du panier
- `src/composables/marketPlace/useCart.js` - Composable ordonnance/panier
- `src/components/marketplace/OrdonnancePreviewModal.vue` - Modal preview

### Modifiés
- `src/api/services/marketPlace.js` - Ajout 2 endpoints
- `src/components/marketplace/OrderForm.vue` - Nouvelle version avec store
- `src/views/marketplace/PharmacyDetails.vue` - Intégration du panier

---

**Tout est prêt ! Vous pouvez maintenant tester le flow complet** 🎉

```bash
npm run dev
```
