# Book Library App

The application is built with React for the frontend, MUI for styling, Node.js for the backend, and Jest for both frontend and backend unit tests. Zustand is used for simple state management. Swiper is also utilized for a dynamic swiping effect on the book list. The responsive design is also implemented for mobile view.

## Figma Design

Check my Figma design for this application: https://www.figma.com/design/b6RUVO5GreNBg2Hou5MoHy/VISA-assessment-design?node-id=0-1&t=GQoPpgXGvKndMc8X-1

## Slide Presentation

https://docs.google.com/presentation/d/1y9FOqJP6yLBeHaHe0os6ZqUnQZ8MSSWDPj0RXKAIkGs/edit?usp=sharing

## Command Line

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `node server.js`

Starts the backend server for handling API requests.

### `npm test`

Frontend Unit Tests: Launches the test runner in the interactive watch mode specifically for frontend testing.

#### Current Test Limitations

Due to issues with Swiper integration, tests for the `BookList` component cannot currently be run.

### `npm testServer`

Backend Unit Tests: Executes the tests for the backend to verify that all API endpoints function correctly.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
