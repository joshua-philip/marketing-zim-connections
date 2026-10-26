/**
 * @module content/campaign-funnel
 * @meta Makes proposed conversion assumptions and their downside explicit; these are not observed benchmarks.
 */

export const funnelAssumptions = {
  reach: 500000,
  visitRate: 0.02,
  creationRate: 0.2,
  completionRate: 0.5,
  minimumOrders: 3,
  assumedOrderValue: 14,
} as const;

export function projectFunnel(visitRate: number = funnelAssumptions.visitRate) {
  const visitors = funnelAssumptions.reach * visitRate;
  const created = visitors * funnelAssumptions.creationRate;
  const completed = created * funnelAssumptions.completionRate;
  const orders = completed * funnelAssumptions.minimumOrders;
  return {
    visitors,
    created,
    completed,
    orders,
    revenue: orders * funnelAssumptions.assumedOrderValue,
  };
}

export const planningCase = projectFunnel();
export const downsideCase = projectFunnel(0.01);

export const funnelStages = [
  {
    label: 'Accounts reached',
    value: funnelAssumptions.reach,
    assumption: 'Campaign reach target',
  },
  {
    label: 'Unique site visitors',
    value: planningCase.visitors,
    assumption: '2% of reached accounts',
  },
  { label: 'Squads created', value: planningCase.created, assumption: '20% of visitors' },
  { label: 'Completed Squads', value: planningCase.completed, assumption: '50% of created Squads' },
] as const;
