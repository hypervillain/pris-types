import Document, { Html, Head, Main, NextScript } from 'next/document'

const BaseCSS = ({ css }) =>
  <style
    dangerouslySetInnerHTML={{
      __html: css
    }}
  />

BaseCSS.defaultProps = {
  css: `
  * {box-sizing:border-box}body{margin:0}
  code {
    display: inline-block;
    background-color: rgb(246, 246, 255);
    padding: 2px;
  }
  pre {
    font-family: Menlo, monospace;
    font-size: 14px;
    padding: 1em;
    margin: 0px;
    background-color: rgb(246, 246, 255);
    overflow-x: auto;
    outline: none;
  }
`
}

export default class MyDocument extends Document {
  render () {
    return (
      <Html>
        <Head>
          <BaseCSS />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
