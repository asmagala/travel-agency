import React from 'react';
import DaysToSummer from './DaysToSummer';
import { shallow } from 'enzyme';

const select = {
  info: '.summerInfo',
  component: '.component',
};

const mockProps = {
  summerInfo: 'mockProps info about days to summer',
};

const realDate = Date;
const mockDate = customDate => class extends Date {
  constructor(...args) {
    if(args.length) {
      super(...args);
    } else {
      super(customDate);
    }
    return this;
  }
  static now() {
    return (new Date(customDate)).getTime();
  }
};

describe('Component DaysToSummer', () => {

  it('should render correct without any crashing', () => {
    const component = shallow(<DaysToSummer />);
    expect(component).toBeTruthy();
  });

  it('should render tag with class component and info', () => {
    const component = shallow(<DaysToSummer />);
    expect(component.exists(select.component)).toEqual(true);
    expect(component.exists(select.info)).toEqual(true);
  });

});

const checkDescriptionAtDate = (date, expectedDescription) => {
  it(`should show correct at ${date}`, () => {
    global.Date = mockDate(`${date}T00:00:00.000Z`);

    const component = shallow(<DaysToSummer { ...mockProps } />);
    const renderedDays = component.find('.summerInfo').text();
    expect(renderedDays).toEqual(expectedDescription);

    global.Date = realDate;
  });
};

describe('DaysToSummer with mockDate', () => {
  checkDescriptionAtDate('2020-06-21', '');
  checkDescriptionAtDate('2020-06-09', '12 days to summer!');
  checkDescriptionAtDate('2020-06-20', '1 days to summer!');
  checkDescriptionAtDate('2020-12-31', '172 days to summer :(. It\'s next year!!!');
  checkDescriptionAtDate('2020-10-30', '234 days to summer :(. It\'s next year!!!');
  checkDescriptionAtDate('2021-01-01', '171 days to summer!');
});

