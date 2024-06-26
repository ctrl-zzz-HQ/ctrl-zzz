import styles from '../Page.module.css';
import agents from '@data/agents';
import { useNavigate } from 'react-router-dom';
import { useMemo, useEffect, useCallback } from 'react';
import ExpandableImage from '@components/ExpandableImage';
import { JsonSocial } from '@types';
import { X, YouTube } from './SocialLogos';
import ScrollToTopContainer from '@/components/ScrollToTopContainer';

const socialToAnchor = function(social: JsonSocial, key: string) {
  if (social.platform === 'x') {
    return <a className={styles.socialLink} key={key} href={`https://x.com/${social.handle}`}>
      <X />
      <span className={styles.socialHandle}>@{social.handle}</span>
    </a>;
  } else if (social.platform === 'yt') {
    return <a className={styles.socialLink} key={key} href={`https://youtube.com/@${social.handle}`}>
      <YouTube />
      <span className={styles.socialHandle}>@{social.handle}</span>
    </a>;
  }
}

export default function Agent({ index }: Props) {

  const getAgent = useCallback((index: number) => index < 0 ? null : agents[index], []);
  const agent = useMemo(() => getAgent(index), [index, getAgent]);
  const navigate = useNavigate();

  useEffect(() => {
    if (index < 0) navigate(`${Math.floor(Math.random() * agents.length)}`);
  }, [index, navigate]);

  return (
    agent &&
    <>
      <h2>
        AGENT {agent.code} [
        <span className="wide">alias: </span>
        {agent.alias}]
      </h2>
      <ScrollToTopContainer>
        <div className="section">
          <h3>&gt; Socials</h3>
          {agent.socials.map((social, index) => socialToAnchor(social, index.toString()))}
        </div>
        <div className="section">
          <h3>&gt; Roles</h3>
          <p>{agent.roles.join(', ')}</p>
        </div>
        {agent.art && <div className="section">
          <h3>&gt; Gallery</h3>
          <p className="secondary-text">[
            <span className="no-touch">click </span>
            <span className="touch">tap </span>
            to enlarge]
          </p>
          <div className="agent image-container">
            {agent.art.map(image =>
              <ExpandableImage image={image} key={image.path}/>)}
          </div>
        </div>}
      </ScrollToTopContainer>
      <div className={`${styles.footer} secondary-text`}>
        <p className="secondary-text">[status: {agent.status}]</p>
      </div>
    </>
  );
}

interface Props {
  index: number;
}
