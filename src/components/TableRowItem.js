import { TableRow, TableCell } from '@mui/material'

export function TableRowItem(props) {
  const styleHidden = props.isHidden ? 'none' : ''

  return (
      <TableRow style={{ display: styleHidden }}>
        <TableCell>{props.title}</TableCell>
        <TableCell>{props.info}</TableCell>
      </TableRow>
  )
}
