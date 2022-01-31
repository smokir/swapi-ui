import { Bold, DetailRow } from './styled';

export const CardDetails = ({ details }: { details: Record<string, string | string[]> }) => (
  <>
    {Object.entries(details).map(([key, value]) => (
      <DetailRow key={key} variant='body2' color='text.secondary' title={value.toString()}>
        <Bold>{key}</Bold>: {value}
      </DetailRow>
    ))}
  </>
);
