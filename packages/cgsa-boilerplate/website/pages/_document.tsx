import * as React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import { AppRegistry } from 'react-native-web';
import { flush } from '@dank-style/react';

function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export const style = `
html, body, #__next {
  width: 100%;
  /* To smooth any scrolling behavior */
  -webkit-overflow-scrolling: touch;
  margin: 0px;
  padding: 0px;
  /* Allows content to fill the viewport and go beyond the bottom */
  min-height: 100%;
}`;

Document.getInitialProps = async ({ renderPage }: any) => {
  AppRegistry.registerComponent('Main', () => Main);
  const { getStyleElement } = AppRegistry.getApplication('Main');
  const page = await renderPage();

  const styles = [
    // eslint-disable-next-line react/jsx-key
    <style dangerouslySetInnerHTML={{ __html: style }} />,
    getStyleElement(),
    ...flush(),
  ];
  return { ...page, styles: React.Children.toArray(styles) };
};

export default Document;
