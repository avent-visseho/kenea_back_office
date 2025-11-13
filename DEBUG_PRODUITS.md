# 🐛 Guide de débogage - Affichage des produits

## Corrections apportées

### ✅ 1. Images base64 supportées
Les images de l'API sont en format base64 (`data:image/png;base64,xxx`).
La fonction `buildImageUrl()` a été mise à jour pour gérer ce format.

### ✅ 2. Logs de debug ajoutés
Des logs ont été ajoutés pour tracer le flux de données :

```javascript
// Dans useMarketPlace.js
📦 Réponse API produits brute: {...}
📦 X produits reçus de l'API
✅ X produits après transformation

// Dans marketplaceTransformers.js
🔄 Produit transformé: {id, nom, image, stock, disponible}
```

## 🧪 Comment déboguer

### Étape 1 : Ouvrir la console du navigateur
Appuyez sur **F12** ou **Ctrl+Shift+I** (Windows/Linux) ou **Cmd+Option+I** (Mac)

### Étape 2 : Aller sur une page de détails de pharmacie
1. Ouvrir http://localhost:5173/marketplace
2. Cliquer sur une pharmacie
3. Observer la console

### Étape 3 : Vérifier les logs

#### ✅ Logs attendus (succès)
```
📦 Réponse API produits brute: {
  status: "SUCCESS",
  message: "Produits de la pharmacie",
  body: [
    {
      id: "PPHA-xxx",
      produitName: "Concentré de bicarbonate",
      imageUrl: "data:image/png;base64,/9j/4AAQ...",
      prix: 1500,
      stock: 20
    }
  ]
}
📦 2 produits reçus de l'API
🔄 Produit transformé: {
  id: "PPHA-xxx",
  nom: "Concentré de bicarbonate",
  image: "data:image/png;base64,/9j/4AAQ...",
  stock: 20,
  disponible: true
}
✅ 2 produits après transformation
✅ Pharmacie PHA-xxx chargée avec 2 produits
```

#### ❌ Problème : Aucun produit affiché
Si vous voyez :
```
📦 2 produits reçus de l'API
✅ 0 produits après transformation
```

**Cause** : Les produits sont filtrés car `disponible: false`
**Raison** : `stock === 0` ou `deleted === true`

**Solution** : Vérifier les données dans l'API

#### ❌ Problème : Images ne s'affichent pas
Si l'image est `undefined` ou erreur :
```
🔄 Produit transformé: {
  image: "undefined...",  // ← PROBLÈME
}
```

**Causes possibles** :
1. `apiProduct.imageUrl` est `null` ou `undefined` dans l'API
2. Le format base64 est invalide

**Vérification** :
```javascript
// Dans la console
console.log(response.data.body[0].imageUrl)
// Doit retourner : "data:image/png;base64,xxx..."
```

#### ❌ Problème : Nom du produit est "Produit"
Si le nom est générique :
```
🔄 Produit transformé: {
  nom: "Produit",  // ← PROBLÈME
}
```

**Cause** : `produitName` est `null` ou `undefined` dans l'API

**Vérification** :
```javascript
// Dans la console
console.log(response.data.body[0].produitName)
// Doit retourner : "Concentré de bicarbonate"
```

## 🔍 Vérifications à faire

### Check 1 : Structure des données API
Ouvrir la console et taper :
```javascript
// Après avoir cliqué sur une pharmacie
// Chercher dans les logs "📦 Réponse API produits brute"
```

Vérifier que la structure correspond à :
```json
{
  "status": "SUCCESS",
  "body": [
    {
      "id": "PPHA-xxx",
      "produitName": "...",  // ← Doit être présent
      "imageUrl": "data:image/png;base64,...",  // ← Doit être présent
      "prix": 1500,
      "stock": 20,  // ← Doit être > 0
      "deleted": false  // ← Doit être false
    }
  ]
}
```

### Check 2 : Filtrage des produits
La fonction `transformProductsListData()` filtre les produits avec :
```javascript
.filter(product => product.disponible)
// disponible = stock > 0 && !deleted
```

Si tous vos produits ont `stock: 0`, ils seront filtrés !

### Check 3 : Composant ProductCard
Le composant affiche :
- `product.nom` (ligne 38)
- `product.image` (ligne 9)
- `product.prix` (ligne 68)
- `product.stock` (ligne 59)

Si ces propriétés sont undefined, rien ne s'affichera.

## 🛠️ Solutions rapides

### Solution 1 : Désactiver temporairement le filtre
Pour tester, commentez le filtre dans `marketplaceTransformers.js` ligne 272 :

```javascript
return apiProducts
  .map(product => transformProductData(product, apiHost))
  .filter(product => product !== null)
  // .filter(product => product.disponible) // ← Commenté temporairement
```

Cela affichera TOUS les produits, même ceux avec stock = 0.

### Solution 2 : Vérifier les images dans les DevTools
1. Ouvrir l'onglet **Network** dans DevTools
2. Recharger la page
3. Chercher la requête vers `/market-places/pharmacie/PHA-xxx`
4. Cliquer sur la requête
5. Onglet **Response**
6. Vérifier que `imageUrl` contient bien du base64

### Solution 3 : Tester avec curl
```bash
curl -X GET "http://10.10.10.175:7070/kenea/api/v3/market-places/pharmacie/PHA-1760634968722-454"
```

Vérifier que la réponse contient :
- `produitName` pour chaque produit
- `imageUrl` en base64 pour chaque produit
- `stock > 0` pour au moins un produit

## 📝 Checklist de débogage

- [ ] Les logs `📦 Réponse API produits brute` s'affichent dans la console
- [ ] Au moins 1 produit est reçu de l'API
- [ ] Au moins 1 produit passe la transformation
- [ ] Le log `🔄 Produit transformé` montre un `nom` valide (pas "Produit")
- [ ] Le log `🔄 Produit transformé` montre une `image` valide (commence par "data:image")
- [ ] Le `stock` est > 0
- [ ] Le `disponible` est `true`

## 🚀 Si tout fonctionne

Vous devriez voir dans la page PharmacyDetails :
- ✅ Images des produits (base64)
- ✅ Noms des produits
- ✅ Prix en FCFA
- ✅ Stock disponible
- ✅ Badges (stock limité, ordonnance)

## ❓ Toujours bloqué ?

Envoyez-moi :
1. **Copie des logs de la console** (tout ce qui commence par 📦, 🔄, ✅)
2. **Screenshot de la page PharmacyDetails**
3. **Réponse brute de l'API** (depuis Network > Response)

Je pourrai ainsi identifier le problème exact !
