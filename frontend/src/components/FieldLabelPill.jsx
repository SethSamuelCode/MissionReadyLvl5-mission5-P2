// components/FieldLabelPill.js
import React from 'react';
import styles from './FieldLabelPill.module.css';

const FieldLabelPill = ({ label }) => {
  return <div className={styles.fieldLabel}>{label}</div>;
};

export default FieldLabelPill;

