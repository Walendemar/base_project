import React from 'react';
import * as styles from '@css/App.module.css';
import logo from '@img/react.png';

const App = () => (
  <div className={styles.app}>
    <h1>Base Project</h1>
    <img src={logo} alt="Logo" />
  </div>
);

export default App;
