import React from 'react';
import styles from './DaysToSummer.scss';


class DaysToSummer extends React.Component {

  getDaysToSummer() {
    let days;

    const dateCurrentDay = new Date();
    const thisYear = dateCurrentDay.getFullYear();
    const currentDay = dateCurrentDay.getTime();
    let summerBegins = new Date(thisYear, 5, 21).getTime();
    const summerEnds = new Date(thisYear, 8, 23).getTime();
    
    if(summerBegins <= currentDay && currentDay <= summerEnds) {
      days = '';
    } else if (currentDay < summerBegins) {
      days = Math.ceil((summerBegins - currentDay) / (1000 * 60 * 60 * 24)) + ' days to summer!';
    } else {
      summerBegins = new Date(thisYear + 1, 5, 21).getTime();
      days = Math.ceil((summerBegins - currentDay) / (1000 * 60 * 60 * 24)) + ' days to summer :(. It\'s next year!!!';
    }

    return days;
  }

  render() {
    return (
      <div className={styles.component}>
        <div className={styles.summerInfo}>{this.getDaysToSummer()}</div>
      </div>
    );
  }

}

export default DaysToSummer;