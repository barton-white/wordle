# Wordle

I've been making this to help hone my react skills and because I love wordle. 

## To-do:

- Need to track stats
- Need a pop up to show stats / fail state
- Redecorate so it's not a rip-off of the official Wordle
- Animations could be crisper. Right now they are kind of bare minimum.
- Refine "yellow" state detection.

## How it works

- Uses binary tree to spell check words. There is a separate dictionary for each starting letter and each one is fetched as needed. So far this works surprisingly fast locally and each dictionary is around 8-11kb.
- The dictionaries were built from the Collin's Scrabble dictionaries. I copied each one to a txt file and used a node script (which I will post somewhere later) to turn each one into a binary tree format in a json file.
- The hardest part was checking for the 'yellow' state. 
	- I have something in place that works pretty good but there are some cases where it gets things wrong. If you use a word with 3 instances of a letter in the input and there are 2 in the answer, the 3rd letter gets marked yellow when it shouldn't.
	- It works most of the time though. 
	- There are very few 5 letter words with 3 instances of the same letter.
	- Using [word.tips](https://word.tips) to test, I've discovered they haven't solved the problem yet either because searching for "SSS" in contains and 5 as the length reveals no results although I know "SASSY" is in their dictionary.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

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

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
