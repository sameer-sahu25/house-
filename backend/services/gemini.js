const { GoogleGenerativeAI } = require('@google/generative-ai');

const generatePlanFromGemini = async (intakeData) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const { state, county, situation, daysUntilDeadline, income, householdSize } = intakeData;

  const prompt = `
Generate a customized housing stability action plan for a tenant based on the following intake details:
- State of Residence: ${state}
- County: ${county}
- Current Situation Description: ${situation}
- Days until crucial deadline/notice expiry: ${daysUntilDeadline}
- Monthly Income: $${income}
- Household Size: ${householdSize}

Your response must be a JSON object matching this schema:
{
  "actionSteps": [
    {
      "number": 1,
      "title": "Short action step title (e.g. Write a Reply to the Notice)",
      "description": "Clear, actionable description of what the tenant must do in detail, incorporating local laws if possible.",
      "badge": "Short urgency badge (e.g. Due in 2 days, Immediate, Due in 5 days)",
      "category": "One of: 'Legal', 'Financial', 'Housing'",
      "urgent": true/false (true if it must be done within 3 days),
      "inactive": false,
      "completed": false
    }
  ],
  "documentsNeeded": [
    "Name of specific document needed (e.g. Lease Agreement, Proof of Income, 3-Day Notice copy)"
  ],
  "rightsSummary": "A concise paragraph summarizing the tenant's legal rights in their state/county regarding their specific situation (e.g. right to cure rent, right to a court hearing, habitability standards).",
  "urgencyLevel": "One of: 'High', 'Medium', 'Low' (based on daysUntilDeadline: High if <= 5 days, Medium if 6-14 days, Low if > 14 days)"
}

Do not include any markdown formatting like \`\`\`json outside the JSON payload. Return ONLY raw valid JSON.
`;

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: 'application/json',
    },
  });

  const responseText = result.response.text();
  return JSON.parse(responseText);
};

// Fallback generator if Gemini fails or is not configured
const generatePlanFallback = (intakeData) => {
  const { state, county, situation, daysUntilDeadline, income, householdSize } = intakeData;

  // Decide urgency level
  let urgencyLevel = 'Low';
  let badgeText = 'Due in 14 days';
  if (daysUntilDeadline <= 5) {
    urgencyLevel = 'High';
    badgeText = 'Immediate';
  } else if (daysUntilDeadline <= 14) {
    urgencyLevel = 'Medium';
    badgeText = 'Due in 5 days';
  }

  // Generate generic rights summary
  let rightsSummary = `Under ${state} state laws, tenants facing eviction have the right to receive proper written notice before any legal action is filed. Landlords cannot lock you out or shut off utilities without a court order. Given your location in ${county}, you may be eligible for local mediation programs.`;
  if (situation.toLowerCase().includes('repair') || situation.toLowerCase().includes('maintenance') || situation.toLowerCase().includes('fix')) {
    rightsSummary = `In ${state}, tenants have the right to a safe and habitable dwelling. If your landlord fails to address critical repairs (like heating, plumbing, or mold) in a timely manner, you have the right to report them to local code enforcement in ${county} or seek rent withholding depending on state guidelines.`;
  }

  // Generate appropriate steps
  const actionSteps = [
    {
      number: 1,
      title: "Organize Housing Documents",
      description: `Gather your lease agreement, landlord notices, and rent receipts. Store them in a secure folder as they will be critical for code enforcement or legal aid in ${state}.`,
      badge: "Immediate",
      category: "Housing",
      urgent: true,
      inactive: false,
      completed: false
    },
    {
      number: 2,
      title: situation.toLowerCase().includes('rent') || situation.toLowerCase().includes('pay') ? "Apply for Emergency Rental Assistance" : "Document Habitability / Maintenance Issues",
      description: situation.toLowerCase().includes('rent') || situation.toLowerCase().includes('pay')
        ? `Since your household size is ${householdSize} and monthly income is $${income}, check for local emergency rental assistance programs in ${county} to cover any rental arrears.`
        : `Take clear photos and videos of all maintenance issues. Write a formal request to your landlord detailing the issues that need repair.`,
      badge: urgencyLevel === 'High' ? "Immediate" : "Due in 3 days",
      category: situation.toLowerCase().includes('rent') || situation.toLowerCase().includes('pay') ? "Financial" : "Legal",
      urgent: urgencyLevel === 'High',
      inactive: false,
      completed: false
    },
    {
      number: 3,
      title: "Consult Local Tenant Legal Aid",
      description: `Contact a local legal aid organization or tenant union in ${county}, ${state}. They can review your situation and advise you on how to respond to your landlord.`,
      badge: badgeText,
      category: "Legal",
      urgent: urgencyLevel === 'High',
      inactive: false,
      completed: false
    },
    {
      number: 4,
      title: "Prepare a Formal Written Response",
      description: `Draft a formal written response or letter to your landlord addressing the situation. Clearly state your position, proposed resolution (like a payment plan), and referenced rights.`,
      badge: "Due in 7 days",
      category: "Legal",
      urgent: false,
      inactive: false,
      completed: false
    }
  ];

  // Documents needed
  const documentsNeeded = ["Lease Agreement", "Rent Receipts / Bank Statements"];
  if (situation.toLowerCase().includes('notice') || situation.toLowerCase().includes('evict')) {
    documentsNeeded.push("Eviction / Landlord Notice");
  }
  if (situation.toLowerCase().includes('repair') || situation.toLowerCase().includes('maintenance') || situation.toLowerCase().includes('fix')) {
    documentsNeeded.push("Maintenance Requests", "Photos of Damage");
  }

  return {
    actionSteps,
    documentsNeeded,
    rightsSummary,
    urgencyLevel,
  };
};

module.exports = {
  generatePlanFromGemini,
  generatePlanFallback
};
