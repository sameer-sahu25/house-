const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Plan = require('../models/Plan');
const { generatePlanFromGemini, generatePlanFallback } = require('../services/gemini');

// POST /api/plan/generate - Generate stability plan for active session
router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const { state, county, situation, daysUntilDeadline, income, householdSize } = req.body;

    if (!state || !situation) {
      return res.status(400).json({ error: 'Missing required intake fields: state and situation' });
    }

    let planData;
    try {
      console.log('Attempting to generate plan using Google Gemini API...');
      planData = await generatePlanFromGemini({
        state,
        county: county || 'Unknown County',
        situation,
        daysUntilDeadline: Number(daysUntilDeadline) || 14,
        income: parseFloat(income) || 0,
        householdSize: Number(householdSize) || 1,
      });
      console.log('Gemini generation successful!');
    } catch (geminiError) {
      console.warn('Gemini API call failed or not configured, using fallback generator. Error:', geminiError.message);
      planData = generatePlanFallback({
        state,
        county: county || 'Unknown County',
        situation,
        daysUntilDeadline: Number(daysUntilDeadline) || 14,
        income: parseFloat(income) || 0,
        householdSize: Number(householdSize) || 1,
      });
    }

    // Upsert plan for the session (re-taking assessment updates the plan)
    const updatedPlan = await Plan.findOneAndUpdate(
      { sessionId: req.sessionId },
      {
        sessionId: req.sessionId,
        actionSteps: planData.actionSteps,
        documentsNeeded: planData.documentsNeeded,
        rightsSummary: planData.rightsSummary,
        urgencyLevel: planData.urgencyLevel,
        createdAt: new Date(),
      },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedPlan);
  } catch (error) {
    console.error('Plan generation failed:', error);
    res.status(500).json({ error: 'Failed to generate stability action plan' });
  }
});

// GET /api/plan/:sessionId - Fetch action plan for active session
router.get('/:sessionId', authMiddleware, async (req, res) => {
  try {
    const plan = await Plan.findOne({ sessionId: req.sessionId });
    if (!plan) {
      return res.status(404).json({ error: 'No stability plan found for this session' });
    }
    res.status(200).json(plan);
  } catch (error) {
    console.error('Fetching plan failed:', error);
    res.status(500).json({ error: 'Failed to retrieve stability plan' });
  }
});

module.exports = router;
