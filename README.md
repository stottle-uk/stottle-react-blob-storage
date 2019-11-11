# StottleReactBlobStorage

Example code used for medium article about [Uploading to blob storage](https://medium.com/@stuarttottle/upload-to-azure-blob-storage-with-react-34f37805fdfc) and [Comparing React and Angular](https://medium.com/@stuarttottle/comparing-the-same-feature-written-in-react-and-angular-3f6ae04ceef6)

## Src Folder Structure

```
src
│   App.tsx
│
└───azure-storage
    │
    └───components
    │   │   ContainerList.tsx
    │   │   InputFile.tsx
    │   │   ItemsDeleted.tsx
    │   │   ItemsDownloaded.tsx
    │   │   ItemsList.tsx
    │   │   ItemsUploaded.tsx
    │   │   SelectedContainer.tsx
    │
    └───services
    │   │   BlobDeletesViewState.ts
    │   │   BlobDownloadedsViewState.ts
    │   │   BlobSharedViewState.ts
    │   │   BlobStorageViewState.ts
    │   │   BlobUploadesViewState.ts
    │   │   SasGeneratorService.ts
    │
    └───types
    │   │   azure-storage.d.ts
    │
    └───contexts
    │   │   * viewStateContext.tsx

* Project specific files
```

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
