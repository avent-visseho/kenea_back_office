// Données statiques pour les pharmacies
export const mockPharmacies = [
  {
    id: 1,
    nom: 'Pharmacie de la Paix',
    adresse: '15 Avenue Léopold Sédar Senghor, Dakar',
    telephone: '+221 33 821 2345',
    email: 'contact@pharmaciepaix.sn',
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=800',
    description: 'Pharmacie moderne offrant une large gamme de médicaments et de services de santé.',
    horaires: 'Lun-Sam: 8h-20h, Dim: 9h-18h',
    services: ['Conseil pharmaceutique', 'Ordonnances', 'Produits de santé', 'Tests rapides'],
    coordonnees: {
      lat: 14.6928,
      lng: -17.4467
    },
    note: 4.5,
    distance: '2.5 km'
  },
  {
    id: 2,
    nom: 'Pharmacie Centrale',
    adresse: '45 Avenue Georges Pompidou, Plateau, Dakar',
    telephone: '+221 33 822 3456',
    email: 'info@pharmaciecentrale.sn',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800',
    description: 'Plus de 50 ans d\'expérience au service de votre santé.',
    horaires: 'Lun-Dim: 7h-22h',
    services: ['Service 24/7', 'Livraison à domicile', 'Consultation médicale', 'Analyses médicales'],
    coordonnees: {
      lat: 14.6937,
      lng: -17.4441
    },
    note: 4.8,
    distance: '1.2 km'
  },
  {
    id: 3,
    nom: 'Pharmacie du Marché',
    adresse: '78 Rue Mohamed V, Sandaga, Dakar',
    telephone: '+221 33 823 4567',
    email: 'contact@pharmaciemarche.sn',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800',
    description: 'Votre pharmacie de proximité avec les meilleurs prix.',
    horaires: 'Lun-Sam: 7h30-19h30',
    services: ['Prix compétitifs', 'Fidélité', 'Conseil personnalisé', 'Produits génériques'],
    coordonnees: {
      lat: 14.6760,
      lng: -17.4630
    },
    note: 4.3,
    distance: '3.8 km'
  },
  {
    id: 4,
    nom: 'Pharmacie Santé Plus',
    adresse: '32 Route de la Corniche Ouest, Almadies, Dakar',
    telephone: '+221 33 824 5678',
    email: 'contact@santepluspharm.sn',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800',
    description: 'Santé et bien-être à portée de main.',
    horaires: 'Lun-Ven: 8h-19h, Sam: 8h-17h',
    services: ['Pharmacie bio', 'Homéopathie', 'Parapharmacie', 'Nutrition'],
    coordonnees: {
      lat: 14.7392,
      lng: -17.4989
    },
    note: 4.6,
    distance: '4.5 km'
  },
  {
    id: 5,
    nom: 'Pharmacie du Point E',
    adresse: '12 Avenue Cheikh Anta Diop, Point E, Dakar',
    telephone: '+221 33 825 6789',
    email: 'info@pharmaciepointe.sn',
    image: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=800',
    description: 'Excellence et professionnalisme depuis 1995.',
    horaires: 'Lun-Dim: 6h-23h',
    services: ['Garde de nuit', 'Urgences', 'Téléconsultation', 'Application mobile'],
    coordonnees: {
      lat: 14.7010,
      lng: -17.4602
    },
    note: 4.9,
    distance: '0.8 km'
  },
  {
    id: 6,
    nom: 'Pharmacie des Nations',
    adresse: '88 Boulevard Martin Luther King, Fann, Dakar',
    telephone: '+221 33 826 7890',
    email: 'contact@pharmacienations.sn',
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=800',
    description: 'Pharmacie internationale aux standards européens.',
    horaires: 'Lun-Sam: 8h-21h, Dim: 10h-18h',
    services: ['Médicaments importés', 'Vaccins', 'Matériel médical', 'Cosmétique'],
    coordonnees: {
      lat: 14.6890,
      lng: -17.4580
    },
    note: 4.7,
    distance: '5.2 km'
  }
]

// Fonction pour obtenir une pharmacie par ID
export const getPharmacyById = (id) => {
  return mockPharmacies.find(pharmacy => pharmacy.id === parseInt(id))
}

// Fonction pour filtrer les pharmacies par recherche
export const searchPharmacies = (query) => {
  if (!query) return mockPharmacies

  const lowerQuery = query.toLowerCase()
  return mockPharmacies.filter(pharmacy =>
    pharmacy.nom.toLowerCase().includes(lowerQuery) ||
    pharmacy.adresse.toLowerCase().includes(lowerQuery) ||
    pharmacy.services.some(service => service.toLowerCase().includes(lowerQuery))
  )
}
