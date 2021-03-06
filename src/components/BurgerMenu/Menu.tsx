import React from 'react';
import './Menu.css';
import MenuLink from './MenuLink';

const Menu = ():JSX.Element => {
  return (
    <div className="Menu">
      <MenuLink text="Home" link="/"/>
      <MenuLink text="About" link="/about"/>
      <MenuLink text="Projects" link="/projects"/>
      <MenuLink text="Countdown" link="/singularity-countdown"/>
      {/* <MenuLink text="Heart React" link="/heart-react"/> */}
    </div>
  );
};

export default Menu;
