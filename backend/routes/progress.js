const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Plan = require('../models/Plan');

// GET /api/progress/:sessionId - Get step completion progress map
router.get('/:sessionId', authMiddleware, async (req, res) => {
  try {
    const plan = await Plan.findOne({ sessionId: req.sessionId });
    if (!plan) {
      return res.status(404).json({ error: 'No stability plan found for this session' });
    }

    // Construct progress record map { "1": true, "2": false, ... }
    const progress = {};
    plan.actionSteps.forEach((step) => {
      progress[String(step.number)] = step.completed;
    });

    res.status(200).json({
      sessionId: req.sessionId,
      progress,
    });
  } catch (error) {
    console.error('Fetching progress failed:', error);
    res.status(500).json({ error: 'Failed to retrieve progress data' });
  }
});

// PATCH /api/progress/:sessionId - Toggle completion of an individual step
router.patch('/:sessionId', authMiddleware, async (req, res) => {
  try {
    const { stepNumber, completed } = req.body;

    if (stepNumber === undefined || completed === undefined) {
      return res.status(400).json({ error: 'Missing stepNumber or completed boolean' });
    }

    const plan = await Plan.findOne({ sessionId: req.sessionId });
    if (!plan) {
      return res.status(404).json({ error: 'No stability plan found for this session' });
    }

    // Find and update specific step
    let stepFound = false;
    plan.actionSteps = plan.actionSteps.map((step) => {
      if (step.number === Number(stepNumber)) {
        step.completed = Boolean(completed);
        stepFound = true;
      }
      return step;
    });

    if (!stepFound) {
      return res.status(404).json({ error: `Step number ${stepNumber} not found in plan` });
    }

    await plan.save();

    // Reconstruct progress map for response
    const progress = {};
    plan.actionSteps.forEach((step) => {
      progress[String(step.number)] = step.completed;
    });

    res.status(200).json({
      message: 'Progress updated successfully',
      progress,
    });
  } catch (error) {
    console.error('Updating progress failed:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

module.exports = router;
