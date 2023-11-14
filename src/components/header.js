import React from 'react'
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  // HeaderGlobalBar,
  // HeaderGlobalAction,
  SideNav,
  SideNavItems,
  SideNavLink,
  SkipToContent,
  HeaderMenuButton,
  SideNavDivider,
} from '@carbon/react'
import {
  Notification,
  Home,
  Calendar,
  // Login,
  // Catalog,
  // User,
  Logout,
} from '@carbon/icons-react'
import { Link } from 'react-router-dom'

const MainHeader = ({ logout }) => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <Header aria-label="안녕, 내일의 나">
        <SkipToContent />
        <HeaderMenuButton
          aria-label="Open menu"
          isCollapsible
          onClick={onClickSideNavExpand}
          isActive={isSideNavExpanded}
        />
        <HeaderName prefix="H3B1" element={Link} to="/">
          안녕, 내일의 나
        </HeaderName>

        <HeaderNavigation aria-label="H3B1">
          <HeaderMenuItem element={Link} to="/">
            이벤트 로그
          </HeaderMenuItem>
          <HeaderMenuItem element={Link} to="/notification">
            대화로그 & 일정 관리
          </HeaderMenuItem>
        </HeaderNavigation>

        <SideNav
          aria-label="Side navigation"
          isRail
          expanded={isSideNavExpanded}
          onOverlayClick={onClickSideNavExpand}
        >
          <SideNavItems>
            <SideNavLink element={Link} to="/" renderIcon={Home}>
              메인
            </SideNavLink>
            <SideNavDivider />
            <SideNavLink
              element={Link}
              to="/notification"
              renderIcon={Notification}
            >
              이벤트 로그
            </SideNavLink>
            <SideNavLink
              element={Link}
              to="/notification"
              renderIcon={Calendar}
            >
              대화로그 & 일정 관리
            </SideNavLink>
            {/* <SideNavLink element={Link} to="/notification" renderIcon={User}>
              마이페이지
            </SideNavLink> */}
            <SideNavDivider />
            <SideNavLink onClick={logout} renderIcon={Logout}>
              로그아웃
            </SideNavLink>
          </SideNavItems>
        </SideNav>
      </Header>
    )}
  />
)

export default React.memo(MainHeader)
