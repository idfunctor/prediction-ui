import Document, { Html, Head, Main, NextScript } from 'next/document'
import * as React from 'react'
import { renderStatic } from 'utils/renderer'

export default class AppDocument extends Document {
  static async getInitialProps(ctx: import('next/document').DocumentContext) {
    const page = await ctx.renderPage()
    const { css, ids } = await renderStatic(page.html)
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: (
        <React.Fragment>
          {initialProps.styles}
          <style
            data-emotion={`css ${ids.join(' ')}`}
            dangerouslySetInnerHTML={{ __html: css }}
          />
        </React.Fragment>
      ),
    } as unknown as import('next/document').DocumentInitialProps;
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}