'use client';
import styles from './DataTable.module.css';

export default function DataTable({
  columns,
  data,
  loading,
  error,
  expandedRowId,
  onRowClick,
  renderExpandedRow,
  clickable = true,
}) {
  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!data || data.length === 0) {
    return <div className={styles.empty}>No data available.</div>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <>
            <tr key={row.id} onClick={() => onRowClick?.(row.id)} className={clickable ? styles.clickable : ''}>
              {columns.map((column, index) => (
                <td key={`${row.id}-${column.key}-${index}`}>
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
            {expandedRowId === row.id && renderExpandedRow && (
              <tr>
                <td colSpan={columns.length} className={styles.expandedRow}>
                  {renderExpandedRow(row)}
                </td>
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
  );
}