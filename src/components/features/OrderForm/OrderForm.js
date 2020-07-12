import React from 'react';
import PropTypes from 'prop-types';

import {Row, Col} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';

import pricing from '../../../data/pricing';
import OrderOption from '../OrderOption/OrderOption';

import styles from './OrderForm.scss';

const OrderForm = ({ tripCost, setOrderOption, options }) => {
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
    </Row>
  );
};

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
};

export default OrderForm;
