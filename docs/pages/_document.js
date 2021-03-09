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
  .sidebar > a {
    font-size: 18px !important;
  }

  .anchored {
    cursor: pointer;
  }

  .anchored:after {
    content: '';
    position: relative;
    top: 3px;
    display: inline-block;
    width: 23px;
    height: 23px;
    background: url("https://b.stripecdn.com/docs/assets/fcc3a1c24df6fcffface6110ca4963de.svg") no-repeat;
    background-size: 100% 100%;
    margin-left: 4px;
    opacity: 0;
    transition: opacity 250ms ease-in-out;
  }
  .anchored:hover:after {
    opacity: 1;
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
