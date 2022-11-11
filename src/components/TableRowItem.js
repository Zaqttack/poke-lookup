import { TableRow, TableCell } from '@mui/material'
import voca from 'voca'

export function TableRowItem(props) {
    return (
        <TableRow>
          <TableCell>{props.title}</TableCell>
          <TableCell>{props.info}</TableCell>
        </TableRow>
    )
}
