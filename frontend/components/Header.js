import React, { useState } from 'react';
import {appName} from'../config'
import Link from 'next/link'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';
import { isAuth,signout } from '../actions/auth';
import NProgress from 'nprogress';
import  Router  from 'next/router';

Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link href='/'><NavLink className='font-weight-bold' >{appName}</NavLink></Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {!isAuth() && <React.Fragment>
              <NavItem>
              <Link href='/signin'><NavLink>Log In</NavLink></Link>
            </NavItem>
            <NavItem>
              <Link href='/signup'><NavLink>Sign Up</NavLink></Link>
            </NavItem>
              </React.Fragment>}
            {isAuth() && (
              <NavItem>
              <NavLink onClick={()=>signout(()=>{Router.replace('/signin')})} >Sign Out</NavLink>
            </NavItem>
            )}
            {isAuth() && (
              <NavItem>
              <Link href={isAuth()?.role==1? '/admin':'/user'}><NavLink>Dashboard</NavLink></Link>
            </NavItem>
            )}
          </Nav>
          
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;