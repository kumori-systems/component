Revisiones de la RELEASE para la RAMA EN DESARROLLO (trunk)
============================================================

.. contents::


Normas
------

  Se utilizan identificadores de cambio compuestos por el par RELEASE (marcado con
  **t**, de trunk) y REVISION (marcado con **rev**).

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

t14.03
------

**t14.03rev0001** 2014-03-21 jbgisber: migrado el módulo desde el repositorio slapcloud.

t14.06
------

**t14.06rev0001** 2014-06-09 clorente: Actualizado a CoffeeScript 1.7.1. #46, [36e138cdd965536fed3ab1a8f4a76be169717734 - eb0560024c232f89a59db0a2076e32edf7303d43].

t14.07
------

**t14.07rev0000** 2014-07-09 clorente: Añadida dependencia con docco. #54, [f25ce040bc7cc7aef64c8446fae37eed7ee33053 - f25ce040bc7cc7aef64c8446fae37eed7ee33053].
