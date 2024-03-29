import React from 'react';
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

interface Call {
  origin: string;
  destination: string;
  minutes: number;
  plan: string;
  plan_price: number;
  noplan_price: number;
}

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function CustomizedTables(data: Call[]) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>DDD de Origem</StyledTableCell>
            <StyledTableCell>DDD de Destino</StyledTableCell>
            <StyledTableCell align="right">Tempo</StyledTableCell>
            <StyledTableCell align="right">Plano</StyledTableCell>
            <StyledTableCell align="right">Com FaleMais</StyledTableCell>
            <StyledTableCell align="right">Sem FaleMais</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(data).map((row) => (
            <StyledTableRow key={Date.now()}>
              <StyledTableCell align="left" component="th">
                {row.origin}
              </StyledTableCell>
              <StyledTableCell align="left" component="th">
                {row.destination}
              </StyledTableCell>

              <StyledTableCell align="right">{row.minutes}</StyledTableCell>
              <StyledTableCell align="right">{row.plan}</StyledTableCell>
              <StyledTableCell align="right">{row.plan_price}</StyledTableCell>
              <StyledTableCell align="right">
                {row.noplan_price}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
