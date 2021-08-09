const replaceData = {
  // Módulo 1: Arquitectura, diseño y calidad software (ADCS)
  '4954 - Diseño y calidad software - GRUPO ÚNICO - A': '1.1 - Diseño y Calidad Software (5 Oct - 18 Oct)',
  '4954 - Patrones y arquitectura software - GRUPO ÚNICO - A': '1.2 - Patrones y Arquitectura Software (19 Oct - 1 Nov)',
  '4954 - Pruebas software - GRUPO ÚNICO - A': '1.3 - Pruebas software (2 Nov - 15 Nov)',
  '4954 - Programación extrema - GRUPO ÚNICO - A': '1.4 - Programación extrema (16 Nov - 29 Nov)',
  // Módulo 2: Servicios de Internet (SI)
  '4954 - Tecnologías de servicios de internet - GRUPO ÚNICO - A': '2.1 - Tecnologías de servicios de Internet (30 Nov - 17 Ene)',
  '4954 - Pruebas de servicios de internet - GRUPO UNICO - A': '2.2 - Pruebas de servicios de Internet (18 Ene - 31 Ene)',
  '4954 - Persistencia y análisis de datos - GRUPO ÚNICO - A': '2.3 - Persistencia y análisis de datos (1 Feb - 14 Feb)',
  '4954 - Patrones y arquitecturas de servicios de internet - GRUPO UNICO - A': '2.4 - Patrones y arquitecturas de servicios de Internet (15 Feb - 28 Feb)',
  // Módulo 3. Aplicaciones nativas de la nube (ANN)
  '4954 - Computación en la nube - GRUPO UNICO - A': '3.1 - Computación en la nube (1 Mar - 14 Mar)',
  '4954 - Contenedores y orquestadores - GRUPO ÚNICO - A': '3.2 - Contenedores y orquestadores (15 Mar - 18 Abril)',
  '4954 - Escalabilidad y tolerancia a fallos - GRUPO ÚNICO - A': '3.3 - Escalabilidad y tolerancia a fallos (19 Abri - 25 Abril)',
  '4954 - Aplicaciones nativas de la nube - GRUPO ÚNICO - A': '3.4 - Aplicaciones nativas de la nube (26 Abril - 23 Mayo)',
  // Módulo 4. DevOps, integración y despliegue continuo (DIDC)
  '4954 - DevOps, integración y despliegue continuo - GRUPO UNICO - A': '4.1 - DevOps, Integración y Despliegue continuo (24 Mayo - 30 Mayo)',
  '4954 - Repositorios y modelos de desarrollo - GRUPO ÚNICO - A': '4.2 - Repositorios y modelos de desarrollo (31 Mayo - 13 Jun)',
  '4954 - Integración y entrega continua - GRUPO UNICO - A': '4.3 - Integración y entrega continua (14 Jun - 27 Jun)',
  '4954 - Despliegue continuo - GRUPO ÚNICO - A': '4.4 - Despliegue continuo (28 Jun - 13 Jul)',
  '4954 - Trabajo Fin de Máster - GRUPO ÚNICO - A': '5 - Trabajo fin de máster',
};

function orderAndReplace(originalData) {
  const ordered = {};

  for (const [original, renamed] of Object.entries(replaceData)) {
    ordered[renamed] = originalData[original] || [];
  }
  return ordered;
}

export function filterData(originalData) {
  const ordinary = {};
  const extraOrdinary = {};
  for (const [subject, data] of Object.entries(orderAndReplace(originalData))) {
    const filterRegex = /recupera|junio|extraordinaria|Práctica 1 - Despliegue de una aplicación Node|Practica 2 - CloudFormation \(Node\)/i;
    ordinary[subject] = data.filter(d => !filterRegex.test(d.practice));
    extraOrdinary[subject] = data.filter(d => filterRegex.test(d.practice));
  }

  return {
    ordinary,
    extraOrdinary,
  };
}
