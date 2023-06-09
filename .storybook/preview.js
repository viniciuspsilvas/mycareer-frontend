import * as NextImage from "next/image";
import '../styles/globals.css';

import { addDecorator } from "@storybook/react";
import { initialize, mswDecorator } from "msw-storybook-addon";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { reactQueryProviderDecorator } from "../src/__mocks__/decorators";
import { nextAuthMocked } from '../src/__mocks__/mockedNextAuth';

/************************************************************************************/
// Initialize MSW

// MSW (browser) worker
// It does not working, it reuse the same React-Query decorator
// if (typeof global.process === 'undefined') {
//   worker.start()
// }

// msw-storybook-addon
initialize();

// Provide the MSW addon decorator globally
addDecorator(mswDecorator);
//  react-query QueryClientProvider
addDecorator(reactQueryProviderDecorator);
/************************************************************************************/

/******************************************************************************************
 * To get the image component working in Storybook we need to do the following 
 * https://storybook.js.org/blog/get-started-with-storybook-and-next-js/
 *****************************************************************************************/
const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => (
    <OriginalNextImage
      {...props}
      unoptimized
    />
  ),
});
/************************************************************************************/
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
    path: '/', // defaults to `/`
    asPath: '/', // defaults to `/`
    query: {}, // defaults to `{}`
    push() {
    } // defaults to using addon actions integration,
    //   can override any method in the router
  },
  // msw: { handlers: [nextAuthMocked] }
}