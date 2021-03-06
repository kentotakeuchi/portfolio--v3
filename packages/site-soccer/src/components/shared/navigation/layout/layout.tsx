import React, { FunctionComponent, useEffect } from 'react'
import { PageProps } from 'gatsby'

import useScroll from '../../../../hooks/scroll-hook'
import useSideDrawer from '../../../../hooks/side-drawer-hook'
import useHasMounted from '../../../../hooks/client-only-hook'

import './layout.scss'
import SideDrawer from '../side-drawer/side-drawer'
import Header from '../header/header'
import NavLinks from '../nav-links/nav-links'
import Language from '../language/language'
import Burger from '../burger/burger'
import Footer from '../footer/footer'
import Brand from '../brand/brand'
import Copyright from '../../ui-elements/copyright/copyright'

const Layout: FunctionComponent<PageProps> = ({ children, location }) => {
  const { pathname } = location

  // Hooks
  const { isShow, setIsShow, scrollDownHideUpShow } = useScroll()
  const {
    drawerIsOpen,
    openDrawerHandler,
    closeDrawerHandler,
  } = useSideDrawer()

  // set scroll event to know current Y position
  scrollDownHideUpShow()

  // show header after page transition
  useEffect(() => {
    setIsShow(false)
  }, [])

  let mq
  const hasMounted = useHasMounted()
  if (hasMounted) {
    mq = window.matchMedia('(max-width: 37.5em)')
  }

  return (
    <>
      {mq?.matches && <Brand className={isShow ? 'hide--mobile' : ''} />}
      <Burger
        onClick={openDrawerHandler}
        isOpen={drawerIsOpen}
        className={isShow ? 'hide--mobile' : ''}
      />

      <SideDrawer show={drawerIsOpen} onCancel={closeDrawerHandler}>
        <nav className="side-drawer__nav">
          <NavLinks place="side-drawer" />
        </nav>
        <div className="side-drawer__footer">
          <Language place="side-drawer" path={pathname} />
          <Copyright />
        </div>
      </SideDrawer>

      <Header className={isShow ? 'hide' : ''}>
        <Brand />
        <nav className="header__nav">
          <NavLinks place="header" />
          <Language place="header" path={pathname} />
        </nav>
      </Header>

      <main className="layout__main">{children}</main>

      <Footer>
        <Copyright />
      </Footer>
    </>
  )
}

export default Layout
