# Remind-เด้อ

*Remind-เด้อ is a website that allows user to organize their tasks depending on their style with a highly customizable reminder. <br>
The website is for students and office workers who want to manage their time, keep track of their tasks, and want to use an alternative reminder platform.* http://remin-der.th1.proen.cloud/

## Technology used for Development

To create our website we use [**React.js**](https://reactjs.org/) as a framework along with [**Ant Design**](https://ant.design/) which is an enterprise-class UI design language and React UI library. We use **Google Authentication Service** as the method for users to log in. We also use Google's [**Firebase**](https://firebase.google.com/) as our database. 

## Tools used for Testing

To test our website we used the following tools
 - **Unit testing** - We use [**Jest**](https://jestjs.io/) which is JavaScript testing framework.
  - **Automated UI Testing** - We use [**Selenium WebDriver**](https://www.selenium.dev/documentation/webdriver/) which is a tool for doing UI test on [**Chrome**](https://www.google.com/chrome/).

## Lesson Learned (In part of QA)

From creating a test of our website, we have learned that Jest is very suitable for React application since Jest can be easily integrated with React and have a function to do test coverage. We also learned about Selenium WebDriver and how to use it to do automated UI testing. 

## Running application

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Testing

### `npm test`

To launches the testing in watch mode.

### `npm test-coverage`

To launches the testing and display the test coverage. *(CI also run test-coverage command)*


