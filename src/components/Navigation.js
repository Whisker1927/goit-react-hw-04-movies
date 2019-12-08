import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../services/routes';
import styles from '../styles/index.module.css';

const Navigation = () => (
  <ul className={styles.listNavigation}>
    <li className={styles.itemNavigaton}>
      <NavLink
        exact
        to={routes.HOME}
        style={{ color: '#212121' }}
        activeStyle={{ color: 'palevioletred' }}
      >
        HOME
      </NavLink>
    </li>
    <li className={styles.itemNavigaton}>
      <NavLink
        to={routes.MOVIES}
        style={{ color: '#212121' }}
        activeStyle={{ color: 'palevioletred' }}
      >
        MOVIES
      </NavLink>
    </li>
  </ul>
);
export default Navigation;
