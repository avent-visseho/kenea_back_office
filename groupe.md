�� Endpoints API (16 au total)
Gestion des Groupes
1. GET /kenea/api/v3/groupes
Fonctionnalité: Récupérer tous les groupes actifs Permissions: Accessible à tous
les utilisateurs authentifiés Réponse: Liste de tous les groupes non supprimés
2. GET /kenea/api/v3/groupes/with-members-profile
Fonctionnalité: Lister les groupes avec membres groupés par profil Permissions:
Accessible à tous les utilisateurs authentifiés Réponse: Groupes avec membres organisés par rôle

3. POST /kenea/api/v3/groupes
Fonctionnalité: Créer un nouveau groupe Permissions: 
{
"nom": "Groupe Famille Dupont"
}
4. DELETE /kenea/api/v3/groupes/{groupeId}
Fonctionnalité: Supprimer un groupe (soft delete) Permissions: 

Gestion des Membres
5. POST /kenea/api/v3/groupes/{groupeId}/members
Fonctionnalité: Ajouter un membre au groupe Permissions: ADMIN ou LEAD du
groupe Body:
{
"userId": "USER-123",
"role": "MEMBER"
}
6. DELETE
/kenea/api/v3/groupes/{groupeId}/members/{userId}
Fonctionnalité: Supprimer un membre du groupe Permissions: ADMIN ou LEAD
du groupe Effet: Retire l'utilisateur du groupe

7. POST
/kenea/api/v3/groupes/{groupeId}/members/{userId}/promote
Fonctionnalité: Promouvoir un membre en LEAD Permissions: ADMIN ou LEAD
du groupe Effet: Change le rôle du membre en ADMIN/LEAD
8. POST
/kenea/api/v3/groupes/{groupeId}/members/{userId}/demote
Fonctionnalité: Rétrograder un LEAD en membre simple Permissions: ADMIN ou
LEAD du groupe Effet: Change le rôle du membre en MEMBER

Gestion Financière
9. PUT /kenea/api/v3/groupes/{groupeId}/budget
Fonctionnalité: Définir le budget mensuel et lancer la répartition Permissions:
ADMIN uniquement Body (Allocation Automatique):
{
"amount": 500000
}
Body (Allocation Manuelle):
{
"amount": 500000,
"allocations": [
{ "userId": "USER-1", "amount": 30000 },
{ "userId": "USER-2", "amount": 15000 }
]
}
Règles Métier : L'allocation individuelle ne peut pas dépasser le salaire de l'utilisateur

La somme des allocations ne peut pas dépasser le budget total du groupe
Si aucune allocation manuelle n'est fournie, distribution proportionnelle au
salaire
10. GET /kenea/api/v3/groupes/{groupeId}/report
Fonctionnalité: Obtenir le rapport financier du groupe Permissions: ADMIN
uniquement Paramètres: ?month=12&year=2025 Réponse: 
{
"groupeId": "GPE-123",
"groupeName": "DEVS",
"monthlyBudget": 500000,
"totalAllocated": 45000,
"totalSpent": 2000,
"totalRemaining": 43000,
"members": [
{
"userId": "USER-1",
"username": "admin@kenea.bj",
"role": "ADMIN",
"allocatedAmount": 30000,
"currentBalance": 28000,
"spentAmount": 2000,
"produitsAchetes": [...]
}
]
}
11. POST
/kenea/api/v3/groupes/payment/ordonnance/{progressionId}
Fonctionnalité: Payer une ordonnance depuis le solde du groupe Permissions:
Membre du groupe avec solde suffisant Effet:
Déduit le montant du currentBalance du membre
Marque l'ordonnance comme COMPLETED

Gestion des Sous-Groupes
12. GET /kenea/api/v3/groupes/{groupeId}/sous-groupes
Fonctionnalité: Récupérer tous les sous-groupes actifs d'un groupe Permissions:
Accessible à tous Réponse: Liste des sous-groupes non supprimés
13. POST /kenea/api/v3/groupes/{groupeId}/sous-groupes
Fonctionnalité: Créer un sous-groupe dans un groupe Permissions: Nécessite
SOUSGROUPE_CREATE Body:
{
"nom": "Sous-groupe Enfants"
}
14. DELETE /kenea/api/v3/groupes/sousgroupes/{sousGroupeId}
Fonctionnalité: Supprimer un sous-groupe (soft delete) Permissions: Nécessite
SOUSGROUPE_DELETE Effet: Marque le sous-groupe comme supprimé
Endpoints Auxiliaires
15. PATCH /kenea/api/v3/users/{id}/salaire
Fonctionnalité: Mettre à jour le salaire d'un utilisateur Permissions: ADMIN Body:
{
"salaire": 300000
}
16. Méthode interne: makePayment(memberId, amount)

Fonctionnalité: Effectuer un paiement générique Validation:
Montant positif
Solde suffisant ( currentBalance >= amount 

========================== les end point : =====================

PHASE2@Affiliation Gestion des groupes


PUT
/kenea/api/v3/groupes/{groupeId}/budget
Définir le budget mensuel du groupe et lancer la répartition (ADMIN uniquement)



GET
/kenea/api/v3/groupes
Récupérer tous les groupes actifs



POST
/kenea/api/v3/groupes
Créer un nouveau groupe, Lors de la création d'un groupe, le créateur est bloqué s'il est déjà membre d'un groupe existant. (nécessite permission GROUPE_CREATE)



GET
/kenea/api/v3/groupes/{groupeId}/sous-groupes
Récupérer tous les sous-groupes actifs d'un groupe



POST
/kenea/api/v3/groupes/{groupeId}/sous-groupes
Créer un sous-groupe dans un groupe (nécessite permission SOUSGROUPE_CREATE)



POST
/kenea/api/v3/groupes/{groupeId}/members
Ajouter des membres au groupe, Un utilisateur ne peut être ajouté à un groupe que s'il ne fait partie d'aucun autre groupe actif. (nécessite d'être LEAD uniquement)



POST
/kenea/api/v3/groupes/{groupeId}/members/{userId}/promote
Promouvoir un membre en LEAD (nécessite d'être ADMIN ou LEAD)



POST
/kenea/api/v3/groupes/{groupeId}/members/{userId}/demote
Rétrograder un LEAD en membre simple (nécessite d'être ADMIN ou LEAD)



POST
/kenea/api/v3/groupes/payment/ordonnance/{progressionId}
Payer une ordonnance traitée depuis le solde du groupe



GET
/kenea/api/v3/groupes/{groupeId}
Récupérer un groupe et ses membres par ID



DELETE
/kenea/api/v3/groupes/{groupeId}
Supprimer un groupe (soft delete) (nécessite permission GROUPE_DELETE)



GET
/kenea/api/v3/groupes/{groupeId}/report
Obtenir le rapport financier du groupe (ADMIN ou LEAD uniquement)



GET
/kenea/api/v3/groupes/with-members-profile
Lister les groupes avec membres groupés par profil



GET
/kenea/api/v3/groupes/my-group
Récupérer le groupe et les membres de l'utilisateur courant



DELETE
/kenea/api/v3/groupes/{groupeId}/members/{userId}
Supprimer un membre du groupe (nécessite d'être ADMIN ou LEAD)



DELETE
/kenea/api/v3/groupes/sous-groupes/{sousGroupeId}
Supprimer un sous-groupe (soft delete) (nécessite permission SOUSGROUPE_DELETE)



Utilisateur

Email / Téléphone

Rôles

Statut

Date de création

Actions

avent visseho

aventvisseho@gmail.com

aventvisseho@gmail.com

aventvisseho@gmail.com

USER
Actif	
1 octobre 2025






pharmacie pharmacie 1

ezev77@gmail.com

ezev77@gmail.com

ezev77@gmail.com

PHARMACIE
Actif	
22 octobre 2025






Gbedji Damien

graciasgbedji@gmail.com

graciasgbedji@gmail.com

graciasgbedji@gmail.com

ADMIN
LEAD
Actif	
29 septembre 2025






dev tool

devtools222@gmail.com

devtools222@gmail.com

devtools222@gmail.com

ADMIN
ADMIN
LEAD
ADMIN
Actif	
24 octobre 2025






