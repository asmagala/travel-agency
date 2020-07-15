import React from 'react';
import PropTypes from 'prop-types';

import {Row, Col} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';

import pricing from '../../../data/pricing';
import OrderOption from '../OrderOption/OrderOption';

import styles from './OrderForm.scss';
import { formatPrice } from '../../../utils/formatPrice';
import { calculateTotal } from '../../../utils/calculateTotal';
import settings from '../../../data/settings';

import Button from '../../common/Button/Button';

const sendOrder = (options, tripCost, tripName, tripId, tripCountryCode) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  if ((options.name !== '') && (options.contact !== '')) {
    const payload = {
      ...options,
      totalCost,
      tripName,
      tripId,
      tripCountryCode,
    };
  
    const url = settings.db.url + '/' + settings.db.endpoint.orders;

    const fetchOptions = {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    fetch(url, fetchOptions)
      .then(function(response) {
        return response.json();
      }).then(function(parsedResponse) {
        console.log('parsedResponse', parsedResponse);
      });
  
  } else {
    window.alert('We need your name and contact to complete the order. Please fill in your data!');
  }
};

const OrderForm = ({ tripCost, setOrderOption, options, tripName, tripId, tripCountryCode }) => {
  return (
    <Row>
      {pricing.map(opt => (
        <Col md={4} key={opt.id} className={styles.box}>
          <OrderOption {...opt} currentValue={options[opt.id]} setOrderOption={setOrderOption}/>
        </Col>
      ))}
      <Col xs={12}>
        <OrderSummary tripCost={tripCost} options={options}/>
      </Col>

      <Button onClick={ () => 
        sendOrder(options, tripCost, tripName, tripId, tripCountryCode)}>Order now!</Button>
    </Row>
  );
};

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  tripId: PropTypes.string,
  tripName: PropTypes.string,
  tripCountryCode: PropTypes.string,
};

export default OrderForm;
