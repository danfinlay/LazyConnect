# LazyConnect

The laziest way to onboard your users as lazily as possible. Because onboarding to wallets and acquiring crypto can be a pain, and you should postpone it until actually necessary.

## Usage

Stop initializing providers in your main entry files. Let your projects be quiet. Build value for your users. If there are eventually any things that actually require a wallet, you can wrap those specific components with the `LazyConnect` element.

You pass `LazyConnect` an `actionName` string which it uses to explain to users why they have to get a wallet to access this particular element. The `LazyConnect` module will make sure the user has a wallet (using the under-appreciated [@metamask/onboarding](https://github.com/MetaMask/metamask-onboarding) module so you actually get linked back to the site after they get their wallet set up), it'll even make sure they select the right network and connect an account, and then it'll get out of your way and let your components shine, and pass them a `provider` in their props, no detection or state management needed.

Example:

```jsx
<LazyConnect actionName="leave a tip for us in crypto" chainId="5">
  <TipButton currency={tokenAddress} amount={amountToRequest}/>
</LazyConnect>
```
Then in your component, you get passed an [EIP-1193 style MetaMask Provider object](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents), which you can use directly or pass to your favorite convenience library.

```jsx
function TipButton (props) {
  const { provider } = props;
  // That's it!
}
```
The styles are basically non existent right now, but that's nice, right? You can make it suit your style. Roll with it. Be lazy. Let your users be lazy. Live your lives.

# Built using Create-React-App

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

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
