evisiones de la RELEASE para la RAMA EN DESARROLLO (develop)
============================================================

.. contents::


Normas
------

  Se utilizan identificadores de cambio compuestos por el par RELEASE (marcado con
  **t**, de develop) y REVISION (marcado con **rev**).

  Los cambios de RELEASE son periódicos, se propone aumentar de release cada mes y su
  nomenclatura es "tXX.YY", donde XX representa el año y YY el mes.

  Los cambios de REVISION se producen con cada nueva fusión al código fuente y su
  nomenclatura es revXXXX, donde XXXX representa es el número de cambio ordenado de
  forma temporal según se produce la fusión.

  Cada número de revisión incluye un cambio atómico y la secuencia de numeración se
  reinicia con el cambio de release. Los cambios de revisión pueden ser de 3 TIPOS:

        * Desarrollo: **NUEVAS** funcionalidades.

        * Desarrollo: **MEJORA** de las existentes.

        * Corrección: Rectificación de **FALLOS**.

  Todos los cambios de revisión deben finalizar con un enlace al conjunto de cambios
  ([XXX]), para que sea fácil revisarlo en el repositorio, mediante el número
  indicado y la dirección https://projects.iti.upv.es/trac/PROYECTO/changeset/XXX

  Además, también se debe incluir un enlace al ticket que describa en detalle la
  tarea realizada en la nueva revisión.

  Por lo tanto cada entrada en el registro debe tener el siguiente formato:

  **tXX.YYrevZZZZ** 2013-MES-DIA login: TIPO COMPONENTE - Descripción. #TICKET, [CHANGESET].

-----------------------------------------------------------------------------------


**t14.11rev0000** 2014-11-21 emiedes: Se añaden merge_to_develop.sh y revisions.rst (ticket #89). #89, [0245cfbc6c8c0047d040c7aa668d863bd31a12f3 - 0245cfbc6c8c0047d040c7aa668d863bd31a12f3].
