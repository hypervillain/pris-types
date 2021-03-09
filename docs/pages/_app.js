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
  { name: 'Live Preview', path: '/live' },
  { name: 'Fields Reference', path: '/fields-ref' },
  { name: 'FAQ', path: '/faq' },
]

const components = {
  a: ({ href, ...props }) =>
    <Link href={href}>
      <a {...props} />
    </Link>,
  h2: ({ children, className, id }) => {
    return (
      <h2
        id={children}
        onClick={() => location.hash = children}
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
