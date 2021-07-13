# aulavirtual-scrapper

> This scrapper requires node 14 

### Install dependencies, exec scrapper and create booth reports

``` bash
$ npm i
$ USER=p.perezp.2020 PASS=xxxxxxxx npm run all
```

### Scrapper only

This will create /results/data.json

``` bash
$ USER=p.perezp.2020 PASS=xxxxxxxx npm run scrapper
```

### Create fullReport.md (requires results/data.json to be present)

This will create /results/data.json

``` bash
$ npm run fullReport
```

Creates a report with each practice grouped by subject, for example:

### 2.1 - Tecnologías de servicios de Internet (30 Nov - 17 Ene)

|practica|ponderación calculada|Calificación|rango|porcentaje|retroalimentación|aporte total|
|---|---|---|---|---|---|---|
|Práctica 1 Entrega|12,50 %|10,00|0–10|83.42 %| |12,50 %|
|Práctica 2 Entrega|12,50 %|9,50|0–10|83.42 %|java * la creación de recursos no devuelve el header location Node * la creación de recursos no devuelve el header location|11,88 %|
|Práctica 3 Entrega|12,50 %|-|0–10|-| |0,00 %|
|Práctica 4  Entrega|12,50 %|9,50|0–10|83.42 %|Falta controlar el punto 4|11,88 %|

### Create shortReport.md (requires results/data.json to be present)

``` bash
$ npm run shortReport
```

Creates a report like this one:

|asignatura|media|calificadas/totales|
|---|---|---|
|1.1 - Diseño y Calidad Software (5 Oct - 18 Oct)|83.42 %|1/1|
|1.2 - Patrones y Arquitectura Software (19 Oct - 1 Nov)|83.42 %|1/1|
|1.3 - Pruebas software (2 Nov - 15 Nov)|83.42 %|1/1|
|1.4 - Programación extrema (16 Nov - 29 Nov)|83.42 %|1/1|
|2.1 - Tecnologías de servicios de Internet (30 Nov - 17 Ene)|83.42 %|3/4|
|2.2 - Pruebas de servicios de Internet (18 Ene - 31 Ene)|83.42 %|2/2|
|2.3 - Persistencia y análisis de datos (1 Feb - 14 Feb)|83.42 %|2/2|
|2.4 - Patrones y arquitecturas de servicios de Internet (15 Feb - 28 Feb)|83.42 %|1/2|
|3.1 - Computación en la nube (1 Mar - 14 Mar)|83.42 %|2/4|
|3.2 - Contenedores y orquestadores (15 Mar - 18 Abril)|83.42 %|1/4|
|3.3 - Escalabilidad y tolerancia a fallos (19 Abri - 25 Abril)|83.42 %|0/1|
|3.4 - Aplicaciones nativas de la nube (26 Abril - 23 Mayo)|83.42 %|0/3|
|4.1 - DevOps, Integración y Despliegue continuo (24 Mayo - 30 Mayo)|83.42 %|0/1|
|4.2 - Repositorios y modelos de desarrollo (31 Mayo - 13 Jun)|83.42 %|0/2|
|4.3 - Integración y entrega continua (14 Jun - 27 Jun)|83.42 %|0/2|
|4.4 - Despliegue continuo (28 Jun - 13 Jul)|83.42 %|0/2|
|5 - Trabajo fin de máster|83.42 %|0/0|
