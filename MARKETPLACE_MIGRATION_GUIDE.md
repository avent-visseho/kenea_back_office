# Guide de Migration Marketplace - API Intégration

## ✅ Changements effectués

### 1. **API Service corrigé** (`src/api/services/marketPlace.js`)
- ✅ Correction des bugs critiques (variables `uuid` non définies)
- ✅ Ajout des paramètres de géolocalisation (latitude, longitude, limit)
- ✅ Syntaxe correcte pour passer les paramètres à Axios
- ✅ Documentation des endpoints

### 2. **Utilitaires de transformation** (`src/utils/marketplaceTransformers.js`)
- ✅ `transformPharmacyData()` - Transforme les données API → format UI
- ✅ `transformProductData()` - Transforme les produits API → format UI
- ✅ `calculateDistance()` - Calcule la distance entre deux coordonnées GPS
- ✅ `buildImageUrl()` - Construit les URLs complètes des images

### 3. **Géolocalisation** (`src/composables/marketPlace/useGeolocation.js`)
- ✅ Récupération automatique de la position de l'utilisateur
- ✅ Gestion des permissions du navigateur
- ✅ Position par défaut (Dakar) si l'utilisateur refuse
- ✅ Cache de 5 minutes pour éviter les appels répétés
- ✅ Gestion complète des erreurs

### 4. **Composable principal** (`src/composables/marketPlace/useMarketPlace.js`)
- ✅ `fetchNearbyPharmacies()` - Charge les pharmacies proches avec géolocalisation
- ✅ `fetchPharmacyById()` - Charge une pharmacie spécifique avec ses produits
- ✅ `searchPharmaciesByKeyword()` - Recherche par mot-clé
- ✅ `fetchAllProducts()` - Charge tous les produits
- ✅ `filterPharmaciesLocally()` - Filtre local sans appel API
- ✅ États de chargement et gestion d'erreurs

### 5. **Vues migrées**
- ✅ **Home.vue** - Affiche les pharmacies proches avec géolocalisation automatique
- ✅ **PharmacyDetails.vue** - Affiche les produits d'une pharmacie spécifique
- ✅ États de chargement (spinners)
- ✅ Messages d'erreur avec bouton "Réessayer"
- ✅ Alertes de géolocalisation

## 📱 Flow complet de l'application

```
1. Utilisateur arrive sur Home.vue
   └─> Demande automatique de géolocalisation
       ├─> Accepté : Charge pharmacies proches de sa position
       └─> Refusé : Charge pharmacies avec position par défaut (Dakar)

2. Utilisateur clique sur une pharmacie
   └─> Navigation vers PharmacyDetails.vue avec l'ID de la pharmacie
       └─> Charge automatiquement les produits de cette pharmacie

3. Utilisateur sélectionne des produits
   └─> Remplit le formulaire de commande
       └─> Soumet la commande (logique existante conservée)
```

## 🧪 Comment tester

### Prérequis
1. L'API doit être accessible à l'URL configurée dans `.env`
2. Vérifier que `VITE_API_BASE_URL` est correctement défini

### Test 1 : Géolocalisation
```bash
# Démarrer le serveur de développement
npm run dev
```

1. Ouvrir la page d'accueil du marketplace
2. Le navigateur devrait demander la permission de géolocalisation
3. **Si accepté** : Les pharmacies proches de votre position s'affichent
4. **Si refusé** : Les pharmacies de Dakar (position par défaut) s'affichent
5. Vérifier dans la console :
   ```
   📍 Position obtenue: {lat: ..., lng: ...}
   ✅ X pharmacies chargées
   ```

### Test 2 : Liste des pharmacies (Home.vue)
1. Vérifier que les cartes de pharmacies s'affichent
2. Vérifier que les distances sont calculées
3. Tester la recherche dans la barre
4. Vérifier que les images se chargent correctement

**États à vérifier :**
- ⏳ État de chargement (spinner)
- ⚠️ Alerte géolocalisation (si refusée)
- ❌ Message d'erreur (si API inaccessible)
- ✅ Affichage normal (si tout fonctionne)

### Test 3 : Détails d'une pharmacie (PharmacyDetails.vue)
1. Cliquer sur une pharmacie
2. Vérifier que les informations s'affichent :
   - Nom, adresse, téléphone
   - Image de couverture
   - Services
   - **Liste des produits de cette pharmacie**
3. Vérifier que les produits sont filtrables/cherchables
4. Tester la sélection de produits
5. Tester le formulaire de commande

**États à vérifier :**
- ⏳ État de chargement
- ❌ Message d'erreur avec bouton "Réessayer"
- 🚫 Page 404 si pharmacie introuvable
- ✅ Affichage normal

### Test 4 : Flow complet
```
Home → Clic pharmacie → PharmacyDetails → Sélection produits → Commande
```

### Test 5 : Gestion d'erreurs
1. Couper l'API ou mettre une mauvaise URL
2. Vérifier que les messages d'erreur s'affichent correctement
3. Cliquer sur "Réessayer"
4. Vérifier que le rechargement fonctionne

## 🔧 Console du navigateur - Logs utiles

### Logs de succès
```
✅ Token attached: Bearer xxx...
📍 Position obtenue: {lat: 14.6928, lng: -17.4467, ...}
✅ 10 pharmacies chargées
✅ Pharmacie PHA-xxx chargée avec 25 produits
```

### Logs d'erreur
```
❌ Erreur de géolocalisation: Vous avez refusé l'accès...
📍 Utilisation de la position par défaut: {lat: 14.6928, lng: -17.4467}
❌ Erreur fetchNearbyPharmacies: Network Error
```

## 📊 Structure des données API

### Pharmacie (de l'API)
```javascript
{
  id: "PHA-1760634968715-619",
  name: "ABDOU AZIZ SY",
  region: "DAKAR",
  ville: "DAKAR",
  adresse: "Parcelles Assainies U 22 N°535",
  phone: "835.00.35",
  latitude: 14.7647,
  longitude: -17.4669,
  deGarde: false,
  produits: [...]  // Produits disponibles
}
```

### Produit (de l'API)
```javascript
{
  id: "PPHA-1762950469377-470",
  code: "202511121327493744BF40",
  produitId: "PDT-1760636566643-268",
  pharmacieId: "PHA-1760634968715-619",
  produitName: "Concentré de bicarbonate",
  prix: 1500,
  stock: 20,
  promotion: false,
  prixPromotion: null,
  imageUrl: "/uploads/produits/xxx.png"
}
```

## 🐛 Résolution des problèmes courants

### Problème : Aucune pharmacie ne s'affiche
**Vérifications :**
1. L'API est-elle accessible ? (vérifier dans Network tab)
2. Le token d'authentification est-il valide ?
3. Y a-t-il des pharmacies dans la base de données ?
4. Vérifier la console pour les erreurs

### Problème : Images ne s'affichent pas
**Solution :** Vérifier que `VITE_API_BASE_URL` est correctement configuré dans `.env`
```env
VITE_API_BASE_URL=http://10.10.10.175:7070
```
Les images sont construites comme : `${VITE_API_BASE_URL}${imageUrl}`

### Problème : Géolocalisation ne fonctionne pas
**Causes possibles :**
1. HTTPS requis en production (HTTP ok en localhost)
2. Permission refusée dans le navigateur
3. Navigateur ne supporte pas la géolocalisation

**Solution :** La position par défaut (Dakar) sera utilisée automatiquement

### Problème : "uuid is not defined"
**Solution :** Ce bug a été corrigé dans `marketPlace.js`. Assurez-vous d'avoir la dernière version.

### Problème : CORS errors
**Solution :** Vérifier la configuration CORS côté serveur pour autoriser l'origine de votre application

## 📝 Variables d'environnement requises

```env
# .env
VITE_API_BASE_URL=http://10.10.10.175:7070
VITE_API_TIMEOUT=120000
```

## 🎯 Prochaines améliorations possibles

1. **Pagination** : Ajouter la pagination pour les listes longues
2. **Cache** : Implémenter un cache plus sophistiqué (Pinia persist)
3. **Favoris** : Permettre aux utilisateurs de sauvegarder des pharmacies favorites
4. **Notifications** : Alertes pour les produits en rupture de stock
5. **Promotions** : Afficher les badges de promotion sur les produits
6. **Avis** : Système de notation et d'avis pour les pharmacies
7. **Carte interactive** : Afficher les pharmacies sur une carte (Leaflet/Google Maps)
8. **Historique** : Conserver l'historique des commandes

## 📞 Support

En cas de problème :
1. Vérifier la console du navigateur
2. Vérifier les logs de l'API
3. Vérifier que tous les fichiers ont bien été créés/modifiés
4. Tester avec les données mockées d'abord pour isoler le problème

## 🎉 Résumé

Votre marketplace utilise maintenant :
- ✅ Vraies données de l'API
- ✅ Géolocalisation automatique
- ✅ Gestion complète des erreurs
- ✅ États de chargement
- ✅ Architecture propre avec composables
- ✅ Transformation des données API → UI

Le flow **Home → Pharmacie → Produits → Commande** est entièrement fonctionnel avec les données réelles de l'API !
