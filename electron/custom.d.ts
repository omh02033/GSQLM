import mysql from 'mysql2/promise';

declare global {
  var SQL: mysql.Connection | null;
}

export {};