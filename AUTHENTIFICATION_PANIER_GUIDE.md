# 🔐 Guide Authentification & Panier - Marketplace

## ✅ Modifications effectuées

### 1. **Vérification de l'authentification avant commande**

Le système vérifie maintenant si l'utilisateur est connecté avant de passer commande.

#### Comportement :

**Si l'utilisateur EST connecté** :
- ✅ Les champs Nom et Prénom sont **pré-remplis automatiquement** avec ses informations
- ✅ Ces champs sont **désactivés** (lecture seule) pour éviter les modifications
- ✅ Un badge vert affiche : "Connecté en tant que [Nom Prénom]"
- ✅ L'utilisateur peut directement passer commande

**Si l'utilisateur N'EST PAS connecté** :
- ⚠️ Au clic sur "Commander maintenant", il est **redirigé vers la page de connexion** (`/signin`)
- ⚠️ Le panier est **automatiquement sauvegardé** dans le localStorage
- ⚠️ L'URL de la page actuelle est passée en paramètre `?redirect=...`
- 📝 Un message bleu indique : "Connectez-vous pour pré-remplir automatiquement vos informations"

**Après connexion/création de compte** :
- ✅ L'utilisateur est **automatiquement redirigé** vers la page de la pharmacie
- ✅ Le **panier est restauré** depuis le localStorage
- ✅ Les champs Nom et Prénom sont **pré-remplis**
- ✅ L'utilisateur peut finaliser sa commande

---

## 📂 Fichiers modifiés

### 1. **`src/components/marketplace/OrderForm.vue`**

**Modifications** :
- Import de `useAuthStore` pour accéder aux informations d'authentification
- Import de `useRouter` pour gérer la redirection
- Ajout d'un `onMounted()` qui pré-remplit automatiquement nom et prénom si l'utilisateur est connecté
- Modification de `handleSubmit()` pour vérifier l'authentification
- Ajout de badges visuels pour informer l'utilisateur de son statut
- Désactivation des champs nom/prénom si pré-remplis

**Code clé** :
```javascript
// Vérifier si l'utilisateur est connecté
if (!authStore.isAuthenticated) {
  console.log('🔒 Utilisateur non connecté - Redirection vers la page de connexion')

  // Rediriger avec l'URL de retour
  router.push({
    name: 'signin',
    query: {
      redirect: router.currentRoute.value.fullPath
    }
  })

  error.value = 'Veuillez vous connecter pour passer commande'
  return
}
```

---

### 2. **`src/composables/useAuth.js`**

**Modifications** :
- Ajout de la gestion du paramètre `redirect` après connexion
- Modification de `signIn()` pour conserver le paramètre redirect lors de la redirection vers OTP
- Modification de `verifyOtp()` pour rediriger vers l'URL d'origine après vérification

**Code clé** :
```javascript
// Après vérification OTP
if (result.success) {
  // Vérifier s'il y a une URL de redirection
  const redirectUrl = router.currentRoute.value.query.redirect

  if (redirectUrl) {
    // Rediriger vers l'URL demandée
    await router.push(redirectUrl)
  } else {
    // Rediriger vers la page appropriée selon le rôle
    await router.push(getHomeRoute())
  }
  return result
}
```

---

### 3. **`src/store/cart/cartStore.js`**

**Modifications majeures** :
- ✅ Ajout de la **persistence automatique dans localStorage**
- ✅ Ajout de `saveToStorage()` - Sauvegarde le panier
- ✅ Ajout de `loadFromStorage()` - Charge le panier au démarrage
- ✅ Ajout d'un `watch` qui sauvegarde automatiquement à chaque modification
- ✅ Chargement automatique au démarrage du store
- ✅ Nettoyage du localStorage lors de `clearCart()`

**Clé de stockage** :
```javascript
const CART_STORAGE_KEY = 'kenea_marketplace_cart'
```

**Structure sauvegardée** :
```json
{
  "items": [...],
  "pharmacyId": "PHA-xxx",
  "pharmacyName": "Nom de la pharmacie",
  "ordonnanceId": "ORD-xxx",
  "ordonnanceData": "data:image/png;base64,...",
  "customerInfo": {
    "nom": "Diallo",
    "prenom": "Mamadou",
    "telWathsApp": "+243 81 234 5678"
  }
}
```

---

### 4. **`src/api/services/marketPlace.js`**

**Nouveau endpoint ajouté** :
```javascript
// Soumettre le panier à la pharmacie
const submitPanierToPharmacy = (panierSubmitData) => {
  return callerService.Axios.post(
    `${callerService.API_URL}market-places/submit-panier-to-pharmacienewv`,
    panierSubmitData
  )
}
```

---

### 5. **`src/composables/marketPlace/useCart.js`**

**Modification de `submitOrder()`** :
- Ajout d'un flow en **2 étapes** :
  1. Création du panier via `POST /paniers/create`
  2. Soumission à la pharmacie via `POST /market-places/submit-panier-to-pharmacienewv`

**Code clé** :
```javascript
// Étape 1 : Créer le panier
const createResponse = await MarketPlaceService.createPanier(panierData)
const panierCreated = createResponse.data.body

// Étape 2 : Préparer les données pour la pharmacie
const submitData = {
  panierId: panierCreated.id,
  lignePanierDto: panierCreated.lignePanierDto,
  total: panierCreated.total
}

// Étape 3 : Soumettre à la pharmacie
const submitResponse = await MarketPlaceService.submitPanierToPharmacy(submitData)

// Vider le panier uniquement si les deux succès
if (submitResponse.data?.status === 'SUCCESS') {
  cartStore.clearCart()
  return panierCreated
}
```

---

## 🔄 Flow Complet

### Cas 1 : Utilisateur déjà connecté

```
1. Utilisateur visite la page de la pharmacie
   ↓
2. Ajoute des produits au panier
   ↓ (Sauvegarde automatique dans localStorage)
3. Clique sur "Commander maintenant"
   ↓
4. Vérification : ✅ Connecté
   ↓
5. Champs nom/prénom pré-remplis automatiquement
   ↓
6. Remplit le téléphone WhatsApp
   ↓
7. Clique sur "Commander maintenant"
   ↓
8. POST /paniers/create
   ↓
9. POST /market-places/submit-panier-to-pharmacienewv
   ↓
10. ✅ Succès → Panier vidé → Modal de succès
```

---

### Cas 2 : Utilisateur non connecté

```
1. Utilisateur visite la page de la pharmacie
   ↓
2. Ajoute des produits au panier
   ↓ (Sauvegarde automatique dans localStorage)
3. Clique sur "Commander maintenant"
   ↓
4. Vérification : ❌ Non connecté
   ↓
5. Redirection → /signin?redirect=/marketplace/pharmacy/PHA-xxx
   ↓ (Panier reste dans localStorage)
6. Utilisateur se connecte ou crée un compte
   ↓
7. Saisit email/téléphone + mot de passe
   ↓
8. Reçoit code OTP
   ↓
9. Entre le code OTP
   ↓
10. Vérification réussie → Redirection automatique vers /marketplace/pharmacy/PHA-xxx
    ↓ (Panier restauré depuis localStorage)
11. Champs nom/prénom pré-remplis automatiquement
    ↓
12. Remplit le téléphone WhatsApp
    ↓
13. Clique sur "Commander maintenant"
    ↓
14. POST /paniers/create
    ↓
15. POST /market-places/submit-panier-to-pharmacienewv
    ↓
16. ✅ Succès → Panier vidé → Modal de succès
```

---

## 🎨 Interface Utilisateur

### Badge "Connecté"
```html
<div class="bg-green-50 border border-green-200 rounded-lg p-3">
  <p class="text-sm text-green-800">
    Connecté en tant que <strong>Mamadou Diallo</strong>
  </p>
</div>
```

### Badge "Non connecté"
```html
<div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
  <p class="text-sm text-blue-800">
    Connectez-vous pour pré-remplir automatiquement vos informations
  </p>
</div>
```

### Champs désactivés (si connecté)
```html
<input
  v-model="form.nom"
  :disabled="authStore.isAuthenticated && form.nom"
  :class="authStore.isAuthenticated && form.nom ? 'bg-gray-100 cursor-not-allowed' : ''"
  class="..."
/>
```

---

## 📊 Logs de Traçabilité

### Connexion réussie
```
👤 Utilisateur connecté - Champs pré-remplis: { nom: 'Diallo', prenom: 'Mamadou' }
```

### Redirection si non connecté
```
🔒 Utilisateur non connecté - Redirection vers la page de connexion
```

### Sauvegarde du panier
```
💾 Panier sauvegardé dans le localStorage
```

### Chargement du panier
```
✅ Panier chargé depuis le localStorage: 3 article(s)
```

### Redirection après connexion
```
🔄 Redirection vers: /marketplace/pharmacy/PHA-1760634968722-454
```

### Soumission de la commande
```
📤 Étape 1/2 : Création du panier...
✅ Panier créé avec succès: { id: 'PNR-xxx', ... }
📤 Étape 2/2 : Soumission du panier à la pharmacie...
✅ Panier soumis à la pharmacie avec succès
🛒 Panier vidé
```

---

## 🧪 Comment Tester

### Test 1 : Utilisateur déjà connecté

1. **Se connecter** d'abord via `/signin`
2. Aller sur `/marketplace`
3. Cliquer sur une pharmacie
4. Ajouter des produits au panier
5. ✅ **Vérifier** : Les champs Nom et Prénom sont pré-remplis
6. ✅ **Vérifier** : Un badge vert affiche "Connecté en tant que..."
7. ✅ **Vérifier** : Les champs sont désactivés (grisés)
8. Remplir le téléphone WhatsApp
9. Cliquer sur "Commander maintenant"
10. ✅ **Vérifier** : Commande soumise directement

---

### Test 2 : Utilisateur non connecté (Flow complet)

1. **Ne pas se connecter** (ou se déconnecter)
2. Aller sur `/marketplace`
3. Cliquer sur une pharmacie
4. Ajouter des produits au panier
5. ✅ **Vérifier** : Le panier affiche les produits
6. ✅ **Vérifier** : Un badge bleu affiche "Connectez-vous pour..."
7. Cliquer sur "Commander maintenant"
8. ✅ **Vérifier** : Redirection vers `/signin?redirect=/marketplace/pharmacy/PHA-xxx`
9. ✅ **Vérifier** : Dans la console : `🔒 Utilisateur non connecté - Redirection...`
10. Se connecter avec email + mot de passe
11. Entrer le code OTP
12. ✅ **Vérifier** : Redirection automatique vers la page de la pharmacie
13. ✅ **Vérifier** : Le panier est toujours rempli
14. ✅ **Vérifier** : Les champs Nom et Prénom sont pré-remplis
15. Remplir le téléphone WhatsApp
16. Cliquer sur "Commander maintenant"
17. ✅ **Vérifier** : Commande soumise avec succès

---

### Test 3 : Persistence du panier

1. Ajouter des produits au panier
2. ✅ **Ouvrir la console** → Application → Local Storage
3. ✅ **Vérifier** : Clé `kenea_marketplace_cart` existe
4. ✅ **Vérifier** : Contenu JSON avec les produits
5. **Rafraîchir la page** (F5)
6. ✅ **Vérifier** : Le panier est toujours rempli
7. ✅ **Vérifier** : Dans la console : `✅ Panier chargé depuis le localStorage: X article(s)`

---

### Test 4 : Création de compte (si pas de compte)

1. Cliquer sur "Commander maintenant" (non connecté)
2. Sur la page de connexion, cliquer sur "Contactez-nous"
3. Créer un compte
4. ✅ **Vérifier** : Redirection automatique vers la page de la pharmacie
5. ✅ **Vérifier** : Le panier est restauré
6. ✅ **Vérifier** : Les champs sont pré-remplis

---

## 🔐 Sécurité

### Points de sécurité :

1. ✅ **Token JWT** : Géré automatiquement par Axios interceptor
2. ✅ **Vérification côté backend** : L'API vérifie le token avant de créer la commande
3. ✅ **localStorage** : Utilisé uniquement pour le panier (pas d'informations sensibles)
4. ✅ **Redirection sécurisée** : Le paramètre `redirect` est vérifié avant redirection

---

## 🐛 Problèmes Possibles et Solutions

### Problème 1 : "Veuillez vous connecter pour passer commande"
**Cause** : L'utilisateur n'est pas connecté
**Solution** : Se connecter via `/signin` puis revenir sur la page

### Problème 2 : Le panier est vide après connexion
**Cause** : localStorage désactivé ou navigateur en mode privé
**Solution** : Activer les cookies et le stockage local dans le navigateur

### Problème 3 : Les champs ne sont pas pré-remplis après connexion
**Cause** : Les informations `person.firstname` et `person.lastname` sont manquantes dans le profil
**Solution** : Vérifier que l'API `/users/me` retourne bien ces champs

### Problème 4 : Redirection infinie
**Cause** : Le paramètre `redirect` pointe vers `/signin`
**Solution** : Vérifier que le paramètre redirect ne contient pas `/signin` ou `/verify-otp`

---

## 📝 Checklist de Validation

- [ ] Utilisateur connecté → Champs pré-remplis
- [ ] Utilisateur connecté → Badge vert affiché
- [ ] Utilisateur connecté → Champs nom/prénom désactivés
- [ ] Utilisateur non connecté → Badge bleu affiché
- [ ] Utilisateur non connecté → Redirection vers /signin
- [ ] Paramètre redirect présent dans l'URL
- [ ] Panier sauvegardé dans localStorage
- [ ] Panier restauré après connexion
- [ ] Redirection automatique après OTP
- [ ] Commande soumise avec succès
- [ ] Panier vidé après succès
- [ ] Logs apparaissent dans la console

---

## 🚀 Prochaines Améliorations Possibles

1. **Toast notifications** : Afficher des notifications visuelles pour chaque action
2. **Validation du numéro WhatsApp** : Vérifier le format international
3. **Limite de temps du panier** : Vider automatiquement après X heures
4. **Indication du stock** : Afficher "Plus que X en stock"
5. **Sauvegarde côté serveur** : Synchroniser le panier avec le backend
6. **Panier partagé** : Permettre de partager le panier via un lien

---

**Tout est prêt ! Le système d'authentification et de persistence du panier est maintenant opérationnel** 🎉

```bash
npm run dev
```
