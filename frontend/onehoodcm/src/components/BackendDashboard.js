import React, { useEffect, useState, Fragment } from 'react';
import Chart from "react-google-charts";
import Tabletop from "tabletop";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

export default function BackendDashboard(props){
  const classes = useStyles();
    const [data, setData] = useState([]);
    const [memoryChart, setMemoryChart] = useState([]);
    useEffect(() => {
        Tabletop.init({
          key: "1z8gbUzffmqHzBnoiJILgixTuP1ppCdeX0P_x2q4eqms",
          simpleSheet: true
        })
          .then((data) => setData(data))
          // .then(data.map((row) => {
          //   setMemoryChart(...memoryChart, [row.ModelName,row.MinMainMemory,row.MaxMainMemory])
          // }))
          .catch((err) => console.warn(err));
      }, []);
    return (
        <div>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Vendor Name</StyledTableCell>
            <StyledTableCell align="right">Model Name</StyledTableCell>
            <StyledTableCell align="right">Machine Cycles per NanoSec</StyledTableCell>
            <StyledTableCell align="right">Min Main memory</StyledTableCell>
            <StyledTableCell align="right">Max Main memory</StyledTableCell>
            <StyledTableCell align="right">CHMIN</StyledTableCell>
            <StyledTableCell align="right">CHMAX</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.VendorName}>
              <StyledTableCell component="th" scope="row">
                {row.VendorName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.ModelName}</StyledTableCell>
              <StyledTableCell align="right">{row.MachineCycles}</StyledTableCell>
              <StyledTableCell align="right">{row.MinMainMemory}</StyledTableCell>
              <StyledTableCell align="right">{row.MaxMainMemory}</StyledTableCell>
              <StyledTableCell align="right">{row.CHMIN}</StyledTableCell>
              <StyledTableCell align="right">{row.CHMAX}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            {/* <ul>
      {data.map((item, i) => (
        <Fragment key={i}>
          <li>Vendor Name -- {item.VendorName}</li>
          <li>ModelName - {item.ModelName}</li>
          <br />
        </Fragment>
      ))}
    </ul> */}
            <div style={{ display: 'flex', maxWidth: 900 }}>
  <Chart
    width={800}
    height={400}
    chartType="ColumnChart"
    loader={<div>Loading Chart</div>}
    data={[
      data.map((rows)=> {
        return [rows.VendorName, parseInt(rows.MinMainMemory), parseInt(rows.MaxMainMemory)]
      })
      // ['Model Name', 'Min Main Memory', 'Max Main Memory'],
      
      ]}
    options={{
      title: 'Population of Largest U.S. Cities',
      chartArea: { width: '30%' },
      hAxis: {
        title: 'Total Population',
        minValue: 0,
      },
      vAxis: {
        title: 'City',
      },
    }}
    legendToggle
  />
  <Chart
    width={400}
    height={'300px'}
    chartType="AreaChart"
    loader={<div>Loading Chart</div>}
    data={[
      ['Year', 'Sales', 'Expenses'],
      ['2013', 1000, 400],
      ['2014', 1170, 460],
      ['2015', 660, 1120],
      ['2016', 1030, 540],
    ]}
    options={{
      title: 'Company Performance',
      hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
      vAxis: { minValue: 0 },
      // For the legend to fit, we make the chart area smaller
      chartArea: { width: '50%', height: '70%' },
      // lineWidth: 25
    }}
  />
</div>
<div style={{ display: 'flex' }}>
  <Chart
    width={400}
    height={'300px'}
    chartType="BubbleChart"
    loader={<div>Loading Chart</div>}
    data={[
      ['ID', 'Life Expectancy', 'Fertility Rate', 'Region', 'Population'],
      ['CAN', 80.66, 1.67, 'North America', 33739900],
      ['DEU', 79.84, 1.36, 'Europe', 81902307],
      ['DNK', 78.6, 1.84, 'Europe', 5523095],
      ['EGY', 72.73, 2.78, 'Middle East', 79716203],
      ['GBR', 80.05, 2, 'Europe', 61801570],
      ['IRN', 72.49, 1.7, 'Middle East', 73137148],
      ['IRQ', 68.09, 4.77, 'Middle East', 31090763],
      ['ISR', 81.55, 2.96, 'Middle East', 7485600],
      ['RUS', 68.6, 1.54, 'Europe', 141850000],
      ['USA', 78.09, 2.05, 'North America', 307007000],
    ]}
    options={{
      title:
        'Correlation between life expectancy, fertility rate ' +
        'and population of some world countries (2010)',
      hAxis: { title: 'Life Expectancy' },
      vAxis: { title: 'Fertility Rate' },
      bubble: { textStyle: { fontSize: 11 } },
    }}
  />
  <Chart
    width={400}
    height={300}
    chartType="LineChart"
    loader={<div>Loading Chart</div>}
    data={[
      [
        { type: 'number', label: 'x' },
        { type: 'number', label: 'values' },
        { id: 'i0', type: 'number', role: 'interval' },
        { id: 'i1', type: 'number', role: 'interval' },
        { id: 'i2', type: 'number', role: 'interval' },
        { id: 'i2', type: 'number', role: 'interval' },
        { id: 'i2', type: 'number', role: 'interval' },
        { id: 'i2', type: 'number', role: 'interval' },
      ],
      [1, 100, 90, 110, 85, 96, 104, 120],
      [2, 120, 95, 130, 90, 113, 124, 140],
      [3, 130, 105, 140, 100, 117, 133, 139],
      [4, 90, 85, 95, 85, 88, 92, 95],
      [5, 70, 74, 63, 67, 69, 70, 72],
      [6, 30, 39, 22, 21, 28, 34, 40],
      [7, 80, 77, 83, 70, 77, 85, 90],
      [8, 100, 90, 110, 85, 95, 102, 110],
    ]}
    options={{
      intervals: { style: 'sticks' },
      legend: 'none',
    }}
  />
</div>
        </div>
    );
}