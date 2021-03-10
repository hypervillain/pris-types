import React from 'react'
import App from 'next/app'
import Link from 'next/link'
import {
  Layout,
  NavLinks,
  Pagination,
} from 'mdx-docs'

import theme from '../src/theme'

const routes = [
  { name: 'Introduction', path: '/' },
  { name: 'Getting Started', path: '/getting-started' },
  { name: 'Models in depth', path: '/models-in-depth' },
  { name: 'Mock Configuration', path: '/mock-config' },
  { name: 'Fields Reference', path: '/fields-ref' },
  { name: 'Live Preview', path: '/live' },
  { name: 'FAQ', path: '/faq' },
]

const components = {
  a: ({ href, ...props }) =>
    <Link href={href}>
      <a {...props} />
    </Link>,
  h2: ({ children, className }) => {
    const id = children.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '').trim()
    return (
      <h2
        id={id}
        onClick={() => location.hash = id}
        className={`${className} anchored`}
      >
        {children}
      </h2>
    )
  }
}


export default class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let page = {}

    if (Component.getInitialProps) {
      page = await Component.getInitialProps(ctx)
    }

    return { page }
  }
  render () {
    const {
      Component,
      page,
      headManager,
      ...props
    } = this.props

    return (
      <Layout
        {...props}
        theme={theme}
        components={components}
        routes={routes}>
        <Layout.MenuToggle />
        <Layout.Sidebar className="sidebar">
          < NavLinks />
        </Layout.Sidebar>
        <Layout.Main>
          <Component {...page} />
          <Pagination />
        </Layout.Main>
      </Layout>
    )
  }
}
