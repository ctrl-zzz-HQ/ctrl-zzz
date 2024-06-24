import styles from '../Page.module.css';
import dreamLogs from '@data/dream-logs';
import { useMemo } from 'react';
import TextToHtml from '@components/TextToHtml';
import ExpandableImage from '@components/ExpandableImage';
import ScrollToTopContainer from '@/components/ScrollToTopContainer';

export default function DreamLog({ index }: Props) {

  const dreamLog = useMemo(() => dreamLogs[index], [index]);

  return (
    <>
      <h2>
        DREAM LOG {dreamLog.code}
      </h2>
      <ScrollToTopContainer>
        <TextToHtml html={dreamLog.html} text={dreamLog.text} />
        {dreamLog.art && (
          <>
            <br/>
            {dreamLog.art.map(image => <ExpandableImage image={image} key={image.path} />)}
          </>
        )}
      </ScrollToTopContainer>
      <p className={`${styles.footer} secondary-text`}>
        [timestamp: {dreamLog.timestamp}]
      </p>
    </>
  );
}

interface Props {
  index: number;
}
