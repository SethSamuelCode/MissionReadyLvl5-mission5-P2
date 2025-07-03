// components/FieldLabelPill.jsx
import React from 'react';
import styles from './FieldLabelPill.module.css';

const FieldLabelPill = ({ label }) => {
  return <div className={styles.fieldPill}>{label}</div>;
};

export default FieldLabelPill;

