import React from 'react';
import { shallow } from 'enzyme';
import TripSummary from './TripSummary';

describe('TripSummary Component', () => {

  const tripSummaryProps = {
    id: 'abc',
    name: 'imageAlt',
    image: 'imageSrc',
    days: 14,
    cost: '$521,317.25',
    tags: ['t1', 't2', 't3'],
  };

  const component = shallow(<TripSummary  {...tripSummaryProps} />);
  it('should render without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('should create link "trip/abc" if props id = "abc"', () => {
    expect(component.find('Link').prop('to')).toEqual(`/trip/${tripSummaryProps.id}`);
  });

  it('should create img tag with proper src and alt attributes', () => {
    expect(component.find('img').prop('src')).toEqual(`${tripSummaryProps.image}`);
    expect(component.find('img').prop('alt')).toEqual(`${tripSummaryProps.name}`);
  });
  
  it('should create proper title name, days and cost', () => {
    expect(component.find('.title').text()).toEqual(`${tripSummaryProps.name}`);
    expect(component.find('.details span').at(0).text()).toEqual(`${tripSummaryProps.days} days`);
    expect(component.find('.details span').at(1).text()).toEqual(`from ${tripSummaryProps.cost}`);
  });

  it('it should throw error if there is not any of: id, image, name, cost, days', () => {
    const {id, ...noId} = tripSummaryProps;
    expect(() => shallow(<TripSummary { ...noId } />).toThrow());

    const {image, ...noImage} = tripSummaryProps;
    expect(() => shallow(<TripSummary { ...noImage } />).toThrow());

    const {name, ...noName} = tripSummaryProps;
    expect(() => shallow(<TripSummary { ...noName } />).toThrow());

    const {cost, ...noCost} = tripSummaryProps;
    expect(() => shallow(<TripSummary { ...noCost } />).toThrow());

    const {days, ...noDays} = tripSummaryProps;
    expect(() => shallow(<TripSummary { ...noDays } />).toThrow());
  });

  it('should create tags in order', () => {
    for( let i = 0; i < tripSummaryProps.tags.length; i++)
    {
      expect(component.find('.tag').at(i).text()).toEqual(`${tripSummaryProps.tags[i]}`);
    }
  });

  it('should not create divs with className .tags if tags is undefined or empty', () => {
    const emptyTags = [];
    const undefinedTags = undefined;
    const emtpyTagsComp = shallow(<TripSummary {...tripSummaryProps} tags={emptyTags} />);
    const undefinedTagsComp = shallow(<TripSummary {...tripSummaryProps} tags={undefinedTags} />);

    expect(emtpyTagsComp.find('.tags').exists()).toBeFalsy();
    expect(undefinedTagsComp.find('.tags').exists()).toBeFalsy();
  });

});