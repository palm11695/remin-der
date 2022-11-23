import React from 'react';
import { create } from 'react-test-renderer';

import { HomePage, DateTimeFormatter, LeadingZero } from '../pages';

/*
* @Test HomePage
*/
describe('HomePage', () => {
  // it('should match the snapshot', () => {
  //   const component = create(<HomePage />);
  //   expect(component.toJSON()).toMatchSnapshot();
  // })
})

/*
* @Test DateTimeFormatter
* [Apply ISP]
* To check that it will return the correct date format
*/
describe('DateTimeFormatter', () => {
  it('should match the snapshot', () => {
    const component = create(DateTimeFormatter({ date: new Date() }));
    expect(component.toJSON()).toMatchSnapshot();
  })

  it('should match when date is null', () => {
    const component = create(DateTimeFormatter({ date: null }));
    expect(component.toJSON()).toMatchSnapshot();
  })
})

/*
* @Test LeadingZero
* [Apply ISP]
* To check that it will return leading zero when number value is less than 10
*/
describe('LeadingZero', () => {
  it('should match when number < 10', () => {
    const component = create(LeadingZero({ number: 1 }));
    expect(component.toJSON()).toMatchSnapshot();
  })

  it('should match when number >= 10', () => {
    const component = create(LeadingZero({ number: 10 }));
    expect(component.toJSON()).toMatchSnapshot();
  })
})
