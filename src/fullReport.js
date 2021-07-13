import fs from 'fs';
import path from 'path';
import { separeInstances } from './filterData.js';

function printTable(dataResults, title) {
  let md = `
#### ${title}
|practica|ponderación calculada|Calificación|rango|porcentaje|retroalimentación|aporte total|
|---|---|---|---|---|---|---|
`;

  md += dataResults.map(p => `|${p.practice}|${p.weighing}|${p.mark}|${p.range}|${p.percentage}|${p.feedback}|${p.contributesTotal}|\n`).join('');
  return md;
}

const rawData = JSON.parse(fs.readFileSync(path.resolve('reports', 'data.json')));
const { firstInstance, secondInstance } = separeInstances(rawData);

let md = `# Calificaciones

`;

for (const subject of Object.keys(firstInstance)) {
  md += `
### ${subject}
`;
  md += printTable(firstInstance[subject], 'Primera instancia');
  md += printTable(secondInstance[subject], 'Segunda instancia');
}

fs.writeFileSync(path.resolve('reports', 'fullReport.md'), md);
