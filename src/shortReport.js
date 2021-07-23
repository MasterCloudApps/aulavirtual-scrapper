import fs from 'fs';
import path from 'path';
import { filterData } from './filterData.js';

function printTable(dataResults, title) {
  let md = `
## ${title}


|asignatura|media|calificadas/totales|
|---|---|---|
`;

  for (const [subject, data] of Object.entries(dataResults)) {
    const filtered = data.filter(d => d.percentage !== '-');
    const media = filtered.reduce((acum, val) => acum + parseFloat(val.percentage.replace(' %', '')), 0) / filtered.length;

    md += `| ${subject} | ${media ? (media/10).toFixed(2) : 0} | ${filtered.length}/${data.length} |
`;
  }
  return md;
}

const rawData = JSON.parse(fs.readFileSync(path.resolve('reports', 'data.json')));
const { ordinary, extraOrdinary } = filterData(rawData);

let md = '';
md += printTable(ordinary, 'Ordinaria');
md += printTable(extraOrdinary, 'Recuperación');

fs.writeFileSync(path.resolve('reports', 'shortReport.md'), md);
