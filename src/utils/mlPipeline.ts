import { DetectedObject, RelatedInfo } from '../types';

const sampleTexts = [
  "Organic Green Tea 100% Natural\nIngredients: Green Tea Leaves\nNet Weight: 100g\nBest Before: 12/2025",
  "Invoice #2024-0891\nDate: March 15, 2024\nTotal Amount: $1,247.50\nPayment Due: April 15, 2024",
  "Welcome to Central Park\nEst. 1858 | New York City\nArea: 843 acres",
  "Prescription\nPatient: John Doe\nMedication: Amoxicillin 500mg\nDosage: 1 capsule 3x daily\nRefills: 2",
  "Recipe: Classic Pasta Carbonara\nServes: 4 | Prep: 15 min\nSpaghetti 400g, Eggs 4, Pancetta 200g, Parmesan 100g",
  "Board Meeting Minutes\nDate: February 28, 2024\nAttendees: 12 members\nAgenda: Q1 Review, Budget Approval",
];

const sampleObjects: DetectedObject[][] = [
  [
    { name: "tea package", confidence: 0.96 },
    { name: "bottle", confidence: 0.87 },
    { name: "label", confidence: 0.93 },
    { name: "table surface", confidence: 0.78 },
  ],
  [
    { name: "document", confidence: 0.98 },
    { name: "text block", confidence: 0.95 },
    { name: "table/grid", confidence: 0.82 },
    { name: "stamp/seal", confidence: 0.65 },
  ],
  [
    { name: "park", confidence: 0.94 },
    { name: "trees", confidence: 0.97 },
    { name: "pathway", confidence: 0.88 },
    { name: "people", confidence: 0.76 },
    { name: "bench", confidence: 0.71 },
  ],
  [
    { name: "prescription paper", confidence: 0.97 },
    { name: "pen", confidence: 0.83 },
    { name: "desk", confidence: 0.79 },
    { name: "medical document", confidence: 0.91 },
  ],
  [
    { name: "food plate", confidence: 0.95 },
    { name: "pasta", confidence: 0.92 },
    { name: "cutlery", confidence: 0.84 },
    { name: "glass", confidence: 0.77 },
    { name: "napkin", confidence: 0.69 },
  ],
  [
    { name: "conference table", confidence: 0.93 },
    { name: "laptop", confidence: 0.89 },
    { name: "whiteboard", confidence: 0.81 },
    { name: "chairs", confidence: 0.86 },
    { name: "documents", confidence: 0.74 },
  ],
];

const sampleSummaries = [
  "The image shows a green tea product package with an organic label. The packaging indicates it contains 100% natural green tea leaves with a net weight of 100g. The product appears to be a premium organic tea brand.",
  "This is a financial invoice document dated March 15, 2024. The invoice (#2024-0891) shows a total amount of $1,247.50 with payment due by April 15, 2024. The document appears to be a standard business invoice.",
  "The image captures a scenic view of Central Park in New York City. The park, established in 1858, spans 843 acres and features lush greenery, walking paths, and recreational areas. It's one of the most visited urban parks in the world.",
  "This is a medical prescription document for a patient named John Doe. The prescribed medication is Amoxicillin 500mg with instructions to take 1 capsule three times daily, with 2 refills remaining.",
  "The image shows a plate of classic pasta carbonara, an Italian dish. The recipe serves 4 people with 15 minutes prep time. Key ingredients include spaghetti, eggs, pancetta, and Parmesan cheese.",
  "This appears to be a conference room setup for a board meeting held on February 28, 2024. The meeting had 12 attendees and the agenda included Q1 review and budget approval discussions.",
];

const sampleRelatedInfo: RelatedInfo[][] = [
  [
    { title: "Green Tea Benefits", description: "Green tea is rich in antioxidants called catechins, which may help reduce the risk of heart disease and certain cancers.", source: "Health Research" },
    { title: "Organic Certification", description: "Organic products are grown without synthetic pesticides or fertilizers, following strict agricultural standards.", source: "USDA Organic" },
    { title: "Tea Production", description: "Green tea is made from Camellia sinensis leaves that have undergone minimal oxidation during processing.", source: "Tea Association" },
  ],
  [
    { title: "Invoice Management", description: "Proper invoice management helps businesses track payments, maintain cash flow, and ensure timely collections.", source: "Business Finance" },
    { title: "Payment Terms", description: "Standard payment terms are typically Net 30, meaning payment is due within 30 days of the invoice date.", source: "Accounting Guide" },
    { title: "Tax Documentation", description: "Invoices serve as important tax documents for both the issuer and recipient for income and expense reporting.", source: "Tax Authority" },
  ],
  [
    { title: "Central Park History", description: "Central Park was designed by Frederick Law Olmsted and Calvert Vaux after winning a design competition in 1858.", source: "NYC Parks" },
    { title: "Urban Green Spaces", description: "Urban parks provide numerous benefits including improved air quality, mental health benefits, and community gathering spaces.", source: "Urban Planning" },
    { title: "Park Biodiversity", description: "Central Park is home to over 26,000 trees, 26,000 animals, and 490 species of wildlife.", source: "Conservancy" },
  ],
  [
    { title: "Amoxicillin Information", description: "Amoxicillin is a penicillin-type antibiotic used to treat bacterial infections including respiratory and urinary tract infections.", source: "Medical Reference" },
    { title: "Prescription Safety", description: "Always follow prescribed dosage instructions and complete the full course of antibiotics even if symptoms improve.", source: "FDA Guidelines" },
    { title: "Medication Storage", description: "Most medications should be stored at room temperature away from moisture and direct sunlight.", source: "Pharmacy Guide" },
  ],
  [
    { title: "Italian Cuisine", description: "Pasta carbonara originated in Rome, Italy, and is one of the most beloved Italian dishes worldwide.", source: "Culinary History" },
    { title: "Nutritional Information", description: "A typical serving of pasta carbonara contains approximately 500-600 calories with significant protein from eggs and cheese.", source: "Nutrition Database" },
    { title: "Cooking Tips", description: "The key to perfect carbonara is using the residual heat from pasta to cook the eggs without scrambling them.", source: "Chef's Guide" },
  ],
  [
    { title: "Board Meeting Best Practices", description: "Effective board meetings require clear agendas, prepared materials, and documented decisions for organizational governance.", source: "Corporate Governance" },
    { title: "Q1 Business Review", description: "Quarterly reviews help organizations assess performance against goals, identify trends, and adjust strategies accordingly.", source: "Business Strategy" },
    { title: "Meeting Documentation", description: "Proper meeting minutes should capture key decisions, action items, responsible parties, and deadlines.", source: "Meeting Guide" },
  ],
];

export function getRandomSample() {
  const index = Math.floor(Math.random() * sampleTexts.length);
  return {
    extractedText: sampleTexts[index],
    objects: sampleObjects[index],
    summary: sampleSummaries[index],
    relatedInformation: sampleRelatedInfo[index],
  };
}

export function generateAnalysisFromImage(fileName: string) {
  const sample = getRandomSample();
  return {
    extractedText: sample.extractedText,
    objects: sample.objects,
    imageDescription: sample.summary,
    summary: sample.summary,
    relatedInformation: sample.relatedInformation,
    originalFileName: fileName,
  };
}
