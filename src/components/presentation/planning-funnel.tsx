/**
 * @module components/presentation/planning-funnel
 * @meta Explains the testable planning funnel without implying measured conversion rates or scaled bars.
 */

import { downsideCase, funnelStages } from '../../content/campaign-funnel';
import { FlowBlock } from '../motion/flow-content';

export function PlanningFunnel() {
  return (
    <FlowBlock className="planning-funnel">
      <p className="micro">WHAT MUST BE TRUE · ILLUSTRATIVE PLANNING CASE</p>
      <ol>
        {funnelStages.map(({ label, value, assumption }) => (
          <li key={label}>
            <strong>{value.toLocaleString('en-GB')}</strong>
            <span>{label}</span>
            <small>{assumption}</small>
          </li>
        ))}
      </ol>
      <p className="funnel-caveat">
        Rates are pilot assumptions, not benchmarks. A 1% visit rate gives {downsideCase.completed}{' '}
        completed Squads / £{downsideCase.revenue.toLocaleString('en-GB')} revenue, holding other
        rates fixed. Saves/shares are a separate engagement KPI.
      </p>
    </FlowBlock>
  );
}
