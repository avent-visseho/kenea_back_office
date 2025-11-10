// Données statiques pour les produits pharmaceutiques
export const mockProducts = {
  1: [ // Produits de la Pharmacie de la Paix
    {
      id: 101,
      nom: 'Paracétamol 500mg',
      categorie: 'Analgésiques',
      prix: 2.50,
      devise: 'FCFA',
      stock: 150,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
      description: 'Médicament pour soulager la douleur et réduire la fièvre.',
      dosage: '500mg',
      format: 'Boîte de 20 comprimés',
      fabricant: 'PharmaCorp',
      ordonnanceRequise: false
    },
    {
      id: 102,
      nom: 'Amoxicilline 1g',
      categorie: 'Antibiotiques',
      prix: 8.75,
      devise: 'FCFA',
      stock: 80,
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
      description: 'Antibiotique à large spectre pour traiter diverses infections.',
      dosage: '1g',
      format: 'Boîte de 12 gélules',
      fabricant: 'MediLab',
      ordonnanceRequise: true
    },
    {
      id: 103,
      nom: 'Ibuprofène 400mg',
      categorie: 'Anti-inflammatoires',
      prix: 3.25,
      devise: 'FCFA',
      stock: 200,
      image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400',
      description: 'Anti-inflammatoire non stéroïdien pour douleurs et inflammations.',
      dosage: '400mg',
      format: 'Boîte de 20 comprimés',
      fabricant: 'PharmaCorp',
      ordonnanceRequise: false
    },
    {
      id: 104,
      nom: 'Vitamine C 1000mg',
      categorie: 'Vitamines',
      prix: 5.50,
      devise: 'FCFA',
      stock: 120,
      image: 'https://images.unsplash.com/photo-1550572017-4fade6f5e7b7?w=400',
      description: 'Complément alimentaire pour renforcer le système immunitaire.',
      dosage: '1000mg',
      format: 'Boîte de 30 comprimés effervescents',
      fabricant: 'VitaHealth',
      ordonnanceRequise: false
    },
    {
      id: 105,
      nom: 'Oméprazole 20mg',
      categorie: 'Gastro-entérologie',
      prix: 6.00,
      devise: 'FCFA',
      stock: 90,
      image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400',
      description: 'Traitement des troubles gastriques et reflux gastro-œsophagien.',
      dosage: '20mg',
      format: 'Boîte de 14 gélules',
      fabricant: 'GastroMed',
      ordonnanceRequise: true
    }
  ],
  2: [ // Produits de la Pharmacie Centrale
    {
      id: 201,
      nom: 'Paracétamol 1000mg',
      categorie: 'Analgésiques',
      prix: 3.00,
      devise: 'FCFA',
      stock: 180,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
      description: 'Paracétamol dosage fort pour douleurs intenses.',
      dosage: '1000mg',
      format: 'Boîte de 16 comprimés',
      fabricant: 'PharmaCorp',
      ordonnanceRequise: false
    },
    {
      id: 202,
      nom: 'Aspirine 100mg',
      categorie: 'Anticoagulants',
      prix: 4.25,
      devise: 'FCFA',
      stock: 140,
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
      description: 'Prévention des maladies cardiovasculaires.',
      dosage: '100mg',
      format: 'Boîte de 30 comprimés',
      fabricant: 'CardioPharm',
      ordonnanceRequise: true
    },
    {
      id: 203,
      nom: 'Sirop contre la toux',
      categorie: 'Respiratoire',
      prix: 7.50,
      devise: 'FCFA',
      stock: 60,
      image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400',
      description: 'Soulage la toux sèche et grasse.',
      dosage: '100ml',
      format: 'Flacon de 100ml',
      fabricant: 'RespiCare',
      ordonnanceRequise: false
    },
    {
      id: 204,
      nom: 'Metformine 850mg',
      categorie: 'Antidiabétiques',
      prix: 9.00,
      devise: 'FCFA',
      stock: 100,
      image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400',
      description: 'Traitement du diabète de type 2.',
      dosage: '850mg',
      format: 'Boîte de 60 comprimés',
      fabricant: 'DiabetoCare',
      ordonnanceRequise: true
    }
  ],
  3: [ // Produits de la Pharmacie du Marché
    {
      id: 301,
      nom: 'Doliprane 500mg (Générique)',
      categorie: 'Analgésiques',
      prix: 1.80,
      devise: 'FCFA',
      stock: 250,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
      description: 'Version générique du paracétamol, qualité garantie.',
      dosage: '500mg',
      format: 'Boîte de 20 comprimés',
      fabricant: 'GenericMed',
      ordonnanceRequise: false
    },
    {
      id: 302,
      nom: 'Chloroquine 100mg',
      categorie: 'Antipaludiques',
      prix: 5.00,
      devise: 'FCFA',
      stock: 130,
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
      description: 'Traitement et prévention du paludisme.',
      dosage: '100mg',
      format: 'Boîte de 20 comprimés',
      fabricant: 'TropicMed',
      ordonnanceRequise: true
    },
    {
      id: 303,
      nom: 'Masque chirurgical',
      categorie: 'Protection',
      prix: 0.50,
      devise: 'FCFA',
      stock: 500,
      image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=400',
      description: 'Masques chirurgicaux jetables, boîte de 50.',
      dosage: 'N/A',
      format: 'Boîte de 50 masques',
      fabricant: 'SafetyFirst',
      ordonnanceRequise: false
    }
  ],
  4: [ // Produits de la Pharmacie Santé Plus
    {
      id: 401,
      nom: 'Curcuma Bio 500mg',
      categorie: 'Phytothérapie',
      prix: 12.00,
      devise: 'FCFA',
      stock: 70,
      image: 'https://images.unsplash.com/photo-1550572017-4fade6f5e7b7?w=400',
      description: 'Complément alimentaire naturel anti-inflammatoire.',
      dosage: '500mg',
      format: 'Boîte de 60 gélules',
      fabricant: 'BioNature',
      ordonnanceRequise: false
    },
    {
      id: 402,
      nom: 'Probiotiques',
      categorie: 'Santé digestive',
      prix: 15.50,
      devise: 'FCFA',
      stock: 50,
      image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400',
      description: 'Rééquilibre la flore intestinale.',
      dosage: '10 milliards CFU',
      format: 'Boîte de 30 gélules',
      fabricant: 'GutHealth',
      ordonnanceRequise: false
    },
    {
      id: 403,
      nom: 'Huile essentielle Eucalyptus',
      categorie: 'Aromathérapie',
      prix: 8.00,
      devise: 'FCFA',
      stock: 40,
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400',
      description: 'Huile essentielle 100% pure pour diffusion.',
      dosage: '10ml',
      format: 'Flacon de 10ml',
      fabricant: 'EssenceNature',
      ordonnanceRequise: false
    }
  ],
  5: [ // Produits de la Pharmacie de la Gombe
    {
      id: 501,
      nom: 'Insuline Rapide',
      categorie: 'Antidiabétiques',
      prix: 25.00,
      devise: 'FCFA',
      stock: 30,
      image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400',
      description: 'Insuline à action rapide pour diabétiques.',
      dosage: '100 UI/ml',
      format: 'Flacon de 10ml',
      fabricant: 'DiabetoCare Pro',
      ordonnanceRequise: true
    },
    {
      id: 502,
      nom: 'Tension-mètre digital',
      categorie: 'Appareils médicaux',
      prix: 45.00,
      devise: 'FCFA',
      stock: 25,
      image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400',
      description: 'Tensiomètre automatique au bras, précis et fiable.',
      dosage: 'N/A',
      format: 'Appareil complet avec étui',
      fabricant: 'MediTech',
      ordonnanceRequise: false
    },
    {
      id: 503,
      nom: 'Test rapide COVID-19',
      categorie: 'Tests diagnostics',
      prix: 12.00,
      devise: 'FCFA',
      stock: 100,
      image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=400',
      description: 'Test antigénique rapide, résultat en 15 minutes.',
      dosage: 'N/A',
      format: 'Kit de test individuel',
      fabricant: 'DiagnoFast',
      ordonnanceRequise: false
    }
  ],
  6: [ // Produits de la Pharmacie des Nations
    {
      id: 601,
      nom: 'Vaccin Hépatite B',
      categorie: 'Vaccins',
      prix: 35.00,
      devise: 'FCFA',
      stock: 20,
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
      description: 'Vaccin contre l\'hépatite B, 3 doses.',
      dosage: '10µg/0.5ml',
      format: 'Seringue pré-remplie',
      fabricant: 'VacciMed International',
      ordonnanceRequise: true
    },
    {
      id: 602,
      nom: 'Crème anti-âge Premium',
      categorie: 'Cosmétique',
      prix: 55.00,
      devise: 'FCFA',
      stock: 35,
      image: 'https://images.unsplash.com/photo-1556228578-dd6a8f574c3d?w=400',
      description: 'Soin anti-âge aux actifs concentrés.',
      dosage: '50ml',
      format: 'Pot de 50ml',
      fabricant: 'DermaLuxe',
      ordonnanceRequise: false
    },
    {
      id: 603,
      nom: 'Fauteuil roulant pliable',
      categorie: 'Matériel médical',
      prix: 250.00,
      devise: 'FCFA',
      stock: 5,
      image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400',
      description: 'Fauteuil roulant léger et pliable, aluminium.',
      dosage: 'N/A',
      format: 'Fauteuil complet',
      fabricant: 'MobiCare',
      ordonnanceRequise: false
    }
  ]
}

// Fonction pour obtenir les produits d'une pharmacie
export const getProductsByPharmacyId = (pharmacyId) => {
  return mockProducts[pharmacyId] || []
}

// Fonction pour rechercher des produits dans une pharmacie
export const searchProducts = (pharmacyId, query) => {
  const products = mockProducts[pharmacyId] || []

  if (!query) return products

  const lowerQuery = query.toLowerCase()
  return products.filter(product =>
    product.nom.toLowerCase().includes(lowerQuery) ||
    product.categorie.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery)
  )
}

// Fonction pour obtenir un produit spécifique
export const getProductById = (pharmacyId, productId) => {
  const products = mockProducts[pharmacyId] || []
  return products.find(product => product.id === parseInt(productId))
}

// Catégories de produits disponibles
export const categories = [
  'Tous',
  'Analgésiques',
  'Antibiotiques',
  'Anti-inflammatoires',
  'Vitamines',
  'Gastro-entérologie',
  'Anticoagulants',
  'Respiratoire',
  'Antidiabétiques',
  'Antipaludiques',
  'Protection',
  'Phytothérapie',
  'Santé digestive',
  'Aromathérapie',
  'Appareils médicaux',
  'Tests diagnostics',
  'Vaccins',
  'Cosmétique',
  'Matériel médical'
]
