import { TableRow, TableCell } from '@mui/material'

export function TableRowItem(props) {
    return (
        <TableRow>
          <TableCell>{props.title}</TableCell>
          <TableCell>{props.info}</TableCell>
        </TableRow>
    )
}
