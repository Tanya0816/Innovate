const { DepartmentScore } = require('../../models');

// Default weights per spec Section 5 - configurable per organization later
// (e.g. move to a Settings table Dev D owns; this function accepts an
// override so that migration doesn't require touching this file).
const DEFAULT_WEIGHTS = { environmental: 0.4, social: 0.3, governance: 0.3 };

function calculateTotalScore({ environmentalScore, socialScore, governanceScore }, weights = DEFAULT_WEIGHTS) {
  const total =
    Number(environmentalScore) * weights.environmental +
    Number(socialScore) * weights.social +
    Number(governanceScore) * weights.governance;

  return Math.round(total * 100) / 100;
}

// Dev C: this is the CONTRACT the other three modules must feed.
// Call this once Environmental/Social/Governance scores are computed
// for a department + period, then persist via DepartmentScore.
async function upsertDepartmentScore({ departmentId, periodStart, periodEnd, environmentalScore, socialScore, governanceScore }, weights) {
  const totalScore = calculateTotalScore({ environmentalScore, socialScore, governanceScore }, weights);

  const [record] = await DepartmentScore.upsert({
    departmentId,
    periodStart,
    periodEnd,
    environmentalScore,
    socialScore,
    governanceScore,
    totalScore,
  });

  return record;
}

module.exports = { calculateTotalScore, upsertDepartmentScore, DEFAULT_WEIGHTS };
