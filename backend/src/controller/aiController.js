const { generateReportNarrative } = require('../Ai/services/reportAiService');
const { generateRecommendations } = require('../Ai/services/recommendationAiService');
const asyncHandler = require('../utils/asyncHandler');

exports.reportNarrative = asyncHandler(async (req, res) => {
  const narrative = await generateReportNarrative(req.body);
  res.json({ narrative });
});

exports.recommendations = asyncHandler(async (req, res) => {
  const recommendations = await generateRecommendations(req.body);
  res.json({ recommendations });
});
