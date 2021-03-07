import React from 'react'
import App from 'next/app'
import Link from 'next/link'
import {
  Layout,
  NavLinks,
  Pagination,
} from 'mdx-docs'

const routes = [
  { name: 'Introduction', path: '/' },
  { name: 'Live Preview', path: '/live' },
  { name: 'FAQ', path: '/faq' },
]

const components = {
  a: ({ href, ...props }) =>
    <Link href={href}>
      <a {...props} />
    </Link>,
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
        components={components}
        routes={routes}>
        <Layout.MenuToggle />
        <Layout.Sidebar>
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
