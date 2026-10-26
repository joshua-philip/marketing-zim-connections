/**
 * @module content/campaign-funnel.test
 * @meta Checks that targets, order assumptions and the downside scenario stay arithmetically consistent.
 */

import { expect, it } from 'vitest';

import { campaignTargets, totalBudget } from './campaign';
import { downsideCase, planningCase } from './campaign-funnel';

it('connects the planning funnel to the stated completion and revenue targets', () => {
  expect(planningCase).toEqual({
    visitors: 10000,
    created: 2000,
    completed: 1000,
    orders: 3000,
    revenue: 42000,
  });
  expect(campaignTargets[2].value).toBe(planningCase.completed);
  expect(totalBudget / planningCase.completed).toBe(20);
});

it('shows the financial consequence of halving only the visit rate', () => {
  expect(downsideCase).toEqual({
    visitors: 5000,
    created: 1000,
    completed: 500,
    orders: 1500,
    revenue: 21000,
  });
});
