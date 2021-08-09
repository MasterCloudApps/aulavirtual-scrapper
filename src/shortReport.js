import fs from 'fs';
import path from 'path';
import { filterData } from './filterData.js';

function printTable(dataResults, title) {
  let md = `
## ${title}


|asignatura|media|calificadas/totales|
|---|---|---|
`;

  let totalMedia = 0;
  let totalSum = 0;
  let totalPractices = 0;
  let totalPracticesCompleted = 0;
  let totalSubjects = Object.entries(dataResults).length;
  let totalSubjectsCompleted = 0;

  for (const [subject, data] of Object.entries(dataResults)) {
    const filtered = data.filter(d => d.percentage !== '-');
    const sum = filtered.reduce((acum, val) => acum + parseFloat(val.percentage.replace(' %', '')), 0);
    const media = sum / filtered.length;

    md += `| ${subject} | ${media ? (media/10).toFixed(2) : 0} | ${filtered.length}/${data.length} |
`;
    totalPracticesCompleted += filtered.length;
    totalPractices += data.length;
    totalSum += sum;
    if (!isNaN(media)) {
      totalSubjectsCompleted ++;
      totalMedia += media;
    }
  }
  const mediaSubjects = totalMedia/totalSubjectsCompleted;
  const mediaPractices = totalSum/totalPracticesCompleted;
  md += `| Media por asignaturas| ${!isNaN(mediaSubjects)?(mediaSubjects/10).toFixed(2):0} | ${totalSubjectsCompleted}/${totalSubjects} |
| Media por practicas| ${!isNaN(mediaPractices)?(mediaPractices/10).toFixed(2):0} | ${totalPracticesCompleted}/${totalPractices} |
`;
  return md;
}

const rawData = JSON.parse(fs.readFileSync(path.resolve('reports', 'data.json')));
const { ordinary, extraOrdinary } = filterData(rawData);

let md = '';
md += printTable(ordinary, 'Ordinaria');
md += printTable(extraOrdinary, 'Recuperación');

fs.writeFileSync(path.resolve('reports', 'shortReport.md'), md);
