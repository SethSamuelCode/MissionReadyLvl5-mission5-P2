import styles from './TableRow.module.css';

export default function TableRow({ label, left, right, isList, isStriped }) {
  return (
    <tr className={`${styles.comparisonRow} ${isStriped ? styles.striped : ''}`}>

      {/* Label Cell */}
      <td className={styles.labelCell}>
        <div className={styles.labelContent}>
          <div className={styles.labelBox}>
            <span>{label}</span>
          </div>
        </div>
      </td>

      {/* Left Value Cell */}
      <td className={styles.valueCell}>
        <div className={styles.valueContent}>
          {Array.isArray(left) ? (
            <div className={styles.labelBox}>
              {left.map((item, idx) => (
                <span key={idx} className={styles.fieldLabel}>{item}</span>
              ))}
            </div>
          ) : (
            <span>{left || '—'}</span>
          )}
        </div>
      </td>

      {/* Right Value Cell */}
      <td className={styles.valueCell}>
        <div className={styles.valueContent}>
          {Array.isArray(right) ? (
            <div className={styles.labelBox}>
              {right.map((item, i) => (
                <span key={i} className={styles.fieldLabel}>{item}</span>
              ))}
            </div>
          ) : (
            <span>{right || '—'}</span>
          )}
        </div>
      </td>

    </tr>
  );
}
