/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     12/02/2023 12:21:17 p.�m.                    */
/*==============================================================*/


drop table if exists TAREA;

drop table if exists USUARIO;

/*==============================================================*/
/* Table: TAREA                                                 */
/*==============================================================*/
create table TAREA
(
   IDTAREA              int not null auto_increment,
   ID                   int not null,
   NTAREA               varchar(200) not null,
   DESCRIPCION          varchar(500) not null,
   FCREACION            date not null,
   FENTREGA             date not null,
   FFINALIZACION        date,
   PRIORIDAD            varchar(1) not null,
   ESTADO               varchar(1) not null,
   CATEGORIA            varchar(200),
   primary key (IDTAREA)
);

/*==============================================================*/
/* Table: USUARIO                                               */
/*==============================================================*/
create table USUARIO
(
   ID                   int not null auto_increment,
   NUSUARIO             varchar(100) not null,
   PASS                 varchar(100) not null,
   primary key (ID)
);

alter table TAREA add constraint FK_RELATIONSHIP_1 foreign key (ID)
      references USUARIO (ID) on delete restrict on update restrict;


-- APP BACK DESPLEGADA, PETICIONES REST A:
      -- https://app-tareas-back-node-production.up.railway.app/

