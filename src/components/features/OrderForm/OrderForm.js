import React from 'react';
import PropTypes from 'prop-types';

import {Row, Col} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';

import pricing from '../../../data/pricing';
import OrderOption from '../OrderOption/OrderOption';

const OrderForm = ({ tripCost, options }) => {
  return (
    <Row>
      {pricing.map(opt => (
        <Col md={4} key={opt.id}>
          {console.log('opt:', opt)}
          <OrderOption {...opt} />
        </Col>
      ))}
      <Col xs={12}>
        <OrderSummary tripCost={tripCost} options={options.order.options}/>
      </Col>
    </Row>
  );
};

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
};

export default OrderForm;
