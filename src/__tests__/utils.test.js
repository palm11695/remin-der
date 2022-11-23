import { create } from 'react-test-renderer';
import { DateTimeFormatter, LeadingZero } from '../utils';

/*
* @Test DateTimeFormatter
* [Apply ISP]
* To check that it will return the correct date format
*/
describe('DateTimeFormatter', () => {
  /* 
  * Try to pass the current date to 'DateTimeFormatter'
  * Expected Result: It will return the correct date format with current date in snapshot.
  */
  it('should match when date is now', () => {
    const component = create(DateTimeFormatter({ date: new Date() }));
    expect(component.toJSON()).toMatchSnapshot();
  })

  /* 
  * Try to pass date: null to 'DateTimeFormatter'
  * Expected Result: It will return the correct date format (01/00/1970 - 07:00) in snapshot.
  */
  it('should match when date is null', () => {
    const component = create(DateTimeFormatter({ date: null }));
    expect(component.toJSON()).toMatchSnapshot();
  })
})

/*
* @Test LeadingZero
* [Apply ISP]
* To check that it will return leading zero when number value is less than 10 (To make the date format correct)
*/
describe('LeadingZero', () => {
  /* 
  * Try to pass number = 1 to 'LeadingZero'
  * Expected Result: It will return "01" as String in snapshot.
  */
  it('should match when number < 10', () => {
    const component = create(LeadingZero({ number: 1 }));
    expect(component.toJSON()).toMatchSnapshot();
  })

  /* 
  * Try to pass number = 10 to 'LeadingZero'
  * Expected Result: It will return "10" as String in snapshot.
  */
  it('should match when number >= 10', () => {
    const component = create(LeadingZero({ number: 10 }));
    expect(component.toJSON()).toMatchSnapshot();
  })
})
