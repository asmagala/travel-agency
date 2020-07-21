import React from 'react';
import styles from './HappyHourAd.scss';
import PropTypes from 'prop-types';

const SECONDS_IN_23_HOURS = 23 * 60 * 60;

class HappyHourAd extends React.Component {
  
  static propTypes = {
    title: PropTypes.string,
    promoDescription: PropTypes.string,
  };

  constructor() {
    super();
    
    /* run this.forceUpdate() every second */
    setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }

  getCountdownTime() {
    const currentTime = new Date();
    const nextNoon = new Date(Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getUTCDate(), 12, 0, 0, 0));

    if(currentTime.getUTCHours() >= 12) {
      nextNoon.setUTCDate(currentTime.getUTCDate() + 1);
    }

    return Math.round((nextNoon.getTime() - currentTime.getTime())/1000);
  }

  render() {
    const { title, promoDescription } = this.props;
    const timeLeft = this.getCountdownTime();
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{title}</h3>
        {(timeLeft > SECONDS_IN_23_HOURS) ? 
          <div className={styles.promoDescription}>{promoDescription}</div> :
          <div className={styles.promoDescription}>{this.getCountdownTime()}</div> }
      </div>
    );
  }
}

export default HappyHourAd;