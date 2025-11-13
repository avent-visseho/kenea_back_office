# ✅ Checklist de test - Marketplace Migration

## 🚀 Démarrage rapide

```bash
npm run dev
```

---

## 📋 Tests à effectuer (cochez au fur et à mesure)

### Test 1 : Géolocalisation automatique
- [ ] Ouvrir http://localhost:5173/marketplace
- [ ] Le navigateur demande la permission de géolocalisation
- [ ] **Si ACCEPTÉ** : Vérifier dans la console `📍 Position obtenue: {lat: ..., lng: ...}`
- [ ] **Si REFUSÉ** : Vérifier alerte jaune "Affichage des pharmacies avec position par défaut"
- [ ] Les pharmacies s'affichent dans les deux cas

### Test 2 : Page d'accueil (Home.vue)
- [ ] Les cartes de pharmacies s'affichent
- [ ] Les images se chargent
- [ ] Les distances sont affichées (ex: "2.5 km" ou "N/A")
- [ ] Le compteur en haut indique le bon nombre de pharmacies
- [ ] La barre de recherche filtre correctement les résultats

### Test 3 : Clic sur une pharmacie
- [ ] Cliquer sur une carte de pharmacie
- [ ] La page se charge (spinner visible)
- [ ] Navigation vers `/marketplace/pharmacy/PHA-xxxx-xxx`
- [ ] La page PharmacyDetails s'affiche

### Test 4 : Page de détails (PharmacyDetails.vue)
- [ ] L'image de couverture de la pharmacie s'affiche
- [ ] Le nom, adresse, téléphone sont visibles
- [ ] Les services sont affichés (badges bleus)
- [ ] **IMPORTANT** : La liste des produits s'affiche (données de l'API)
- [ ] Les images des produits se chargent
- [ ] Les prix sont affichés en FCFA
- [ ] Le stock est visible

### Test 5 : Sélection de produits
- [ ] Cliquer sur "Ajouter" sur un produit
- [ ] Le produit apparaît dans le panier à droite
- [ ] Le compteur du panier se met à jour
- [ ] Cliquer sur plusieurs produits
- [ ] Retirer un produit du panier (icône poubelle)

### Test 6 : Formulaire de commande
- [ ] Remplir le formulaire (nom, téléphone, etc.)
- [ ] Uploader une ordonnance (optionnel)
- [ ] Cliquer sur "Commander"
- [ ] Le modal de succès s'affiche
- [ ] Le panier se vide
- [ ] Vérifier dans la console les données de la commande

### Test 7 : Navigation
- [ ] Cliquer sur "Retour" (flèche en haut à gauche)
- [ ] Retour à la page d'accueil
- [ ] Les pharmacies sont toujours là (pas de rechargement)

### Test 8 : Gestion d'erreurs
- [ ] Couper l'API ou mettre une mauvaise URL dans .env
- [ ] Recharger la page d'accueil
- [ ] Le message d'erreur rouge s'affiche
- [ ] Cliquer sur "Réessayer"
- [ ] Remettre la bonne URL et recharger
- [ ] Les pharmacies s'affichent

### Test 9 : Console du navigateur (F12)
- [ ] Pas d'erreurs JavaScript critiques
- [ ] Voir les logs `✅ X pharmacies chargées`
- [ ] Voir les logs `✅ Pharmacie XXX chargée avec X produits`
- [ ] Pas de warnings CORS

### Test 10 : Responsive
- [ ] Tester sur mobile (ou mode responsive du navigateur)
- [ ] Les cartes s'adaptent (1 colonne sur mobile)
- [ ] Le panier reste accessible
- [ ] La navigation fonctionne

---

## 🔍 Vérifications dans la console

### ✅ Logs de succès attendus

```
📍 Position obtenue: {lat: 14.7647, lng: -17.4669, accuracy: 10, timestamp: 1762950469377}
✅ 12 pharmacies chargées
📍 Pharmacie sélectionnée: ABDOU AZIZ SY
✅ Pharmacie PHA-1760634968715-619 chargée avec 25 produits
```

### ⚠️ Warnings acceptables

```
📍 Utilisation de la position par défaut: {lat: 14.6928, lng: -17.4467}
⚠️ Géolocalisation échouée, utilisation de la position par défaut
```

### ❌ Erreurs à investiguer

```
❌ Erreur fetchNearbyPharmacies: Network Error
❌ Erreur 401 - Non autorisé
❌ Uncaught TypeError: Cannot read property 'xxx' of undefined
```

---

## 📊 Données à vérifier

### Dans Home.vue
- **Nombre de pharmacies** : Doit correspondre au nombre renvoyé par l'API
- **Distance** : Doit être calculée (pas "N/A" si géolocalisation OK)
- **Images** : Doivent être des URLs complètes : `http://10.10.10.175:7070/uploads/...`

### Dans PharmacyDetails.vue
- **ID de la pharmacie** : Format `PHA-xxxxxxxxx-xxx`
- **Nombre de produits** : Doit correspondre à cette pharmacie spécifique
- **Prix** : Nombres positifs
- **Stock** : Nombres entiers (peut être 0)

---

## 🎯 Résultat attendu

Si tous les tests passent :
- ✅ La marketplace fonctionne avec les **vraies données de l'API**
- ✅ La géolocalisation automatique fonctionne
- ✅ Le flow complet Home → Pharmacie → Produits → Commande est opérationnel
- ✅ Les états de chargement et erreurs sont gérés

---

## 🐛 Si quelque chose ne fonctionne pas

### 1. Vérifier l'API
```bash
curl http://10.10.10.175:7070/kenea/api/v3/market-places/proches?latitude=14.6928&longitude=-17.4467&limit=10
```

Devrait retourner :
```json
{
  "status": "SUCCESS",
  "body": [...]
}
```

### 2. Vérifier les fichiers créés
```bash
ls -la src/composables/marketPlace/
ls -la src/utils/
```

Devrait montrer :
- `useMarketPlace.js`
- `useGeolocation.js`
- `marketplaceTransformers.js`

### 3. Vérifier .env
```bash
cat .env | grep VITE_API
```

Devrait afficher :
```
VITE_API_BASE_URL=http://10.10.10.175:7070/
```

### 4. Vérifier les imports
Les fichiers ne doivent plus importer :
- ❌ `@/data/mockPharmacies`
- ❌ `@/data/mockProducts`

Mais doivent importer :
- ✅ `@/composables/marketPlace/useMarketPlace`

---

## 📞 En cas de blocage

1. Ouvrir la console du navigateur (F12)
2. Regarder l'onglet "Network" pour voir les requêtes API
3. Regarder l'onglet "Console" pour voir les logs
4. Vérifier que l'API renvoie bien des données
5. Consulter le fichier `MARKETPLACE_MIGRATION_GUIDE.md`

---

## ✨ Bonus : Test avancé

### Test des endpoints API directement

```bash
# 1. Liste des pharmacies proches
curl -X GET "http://10.10.10.175:7070/kenea/api/v3/market-places/proches?latitude=14.6928&longitude=-17.4467&limit=10"

# 2. Produits d'une pharmacie spécifique
curl -X GET "http://10.10.10.175:7070/kenea/api/v3/market-places/pharmacie/PHA-1760634968715-619"

# 3. Tous les produits
curl -X GET "http://10.10.10.175:7070/kenea/api/v3/market-places/all"
```

---

**Bon test ! 🚀**

Une fois tous les tests cochés, votre marketplace est prête pour la production !
