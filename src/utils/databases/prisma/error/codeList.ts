/**
 * Map of known Prisma error codes to HTTP status codes and messages.
 * Extend this map to handle additional error codes if needed.
 */
export const PrismaErrorCodeList: Record<
  string,
  { status: number; message: string }
> = {
  P1000: {
    status: 500,
    message: `Authentication failed against the database server.`,
  },
  P1001: {
    status: 503,
    message: `Can't reach database server at ${process.env.APP_NAME}.`,
  },
  P1002: {
    status: 503,
    message: `The database server was reached but timed out.`,
  },
  P1003: {
    status: 500,
    message: `Database does not exist.`,
  },
  P1008: {
    status: 504,
    message: `Operations timed out.`,
  },
  P1009: {
    status: 500,
    message: `Database requires SSL connection.`,
  },
  P1010: {
    status: 403,
    message: `User was denied access to the database.`,
  },
  P1011: {
    status: 500,
    message: `Error opening a TLS connection.`,
  },
  P1012: {
    status: 500,
    message: `Schema validation error.`,
  },
  P1013: {
    status: 500,
    message: `Invalid Prisma schema.`,
  },
  P1014: {
    status: 500,
    message: `The underlying engine for the datasource could not be found.`,
  },
  P1015: {
    status: 500,
    message: `Your Prisma schema is using features that are not supported for the database.`,
  },
  P1016: {
    status: 500,
    message: `Your Prisma schema is using features that are not supported for the database version.`,
  },
  P1017: {
    status: 500,
    message: `The Prisma engine has crashed.`,
  },
  P1018: {
    status: 500,
    message: `The current Prisma engine version is not compatible with the database.`,
  },
  P1019: {
    status: 500,
    message: `The Prisma engine could not be started.`,
  },
  P1020: {
    status: 500,
    message: `The Prisma engine exited with an error.`,
  },
  P1021: {
    status: 500,
    message: `The Prisma engine could not be started due to missing dependencies.`,
  },
  P1022: {
    status: 500,
    message: `The Prisma engine could not be started due to an unknown error.`,
  },
  P2000: {
    status: 400,
    message: `The provided value for the column is too long for the column's type.`,
  },
  P2001: {
    status: 404,
    message: `The record searched for in the where condition does not exist.`,
  },
  P2002: {
    status: 400,
    message: `Unique constraint failed on the fields.`,
  },
  P2003: {
    status: 400,
    message: `Foreign key constraint failed on the field.`,
  },
  P2004: {
    status: 400,
    message: `A constraint failed on the database.`,
  },
  P2005: {
    status: 400,
    message: `The value stored in the database for the field is invalid for the field's type.`,
  },
  P2006: {
    status: 400,
    message: `The provided value for the field is not valid.`,
  },
  P2007: {
    status: 400,
    message: `Data validation error.`,
  },
  P2008: {
    status: 500,
    message: `Failed to parse the query.`,
  },
  P2009: {
    status: 400,
    message: `Failed to validate the query.`,
  },
  P2010: {
    status: 400,
    message: `Raw query failed.`,
  },
  P2011: {
    status: 400,
    message: `Null constraint violation on the field.`,
  },
  P2012: {
    status: 400,
    message: `Missing a required value.`,
  },
  P2013: {
    status: 400,
    message: `Missing the required argument.`,
  },
  P2014: {
    status: 400,
    message: `The change you are trying to make would violate the required relation.`,
  },
  P2015: {
    status: 404,
    message: `A related record could not be found.`,
  },
  P2016: {
    status: 400,
    message: `Query interpretation error.`,
  },
  P2017: {
    status: 400,
    message: `The records for the relation between the parent and child models were not connected.`,
  },
  P2018: {
    status: 400,
    message: `The required connected records were not found.`,
  },
  P2019: {
    status: 400,
    message: `Input error.`,
  },
  P2020: {
    status: 400,
    message: `Value out of range for the type.`,
  },
  P2021: {
    status: 400,
    message: `The table does not exist in the current database.`,
  },
  P2022: {
    status: 400,
    message: `The column does not exist in the current database.`,
  },
  P2023: {
    status: 400,
    message: `Inconsistent column data.`,
  },
  P2024: {
    status: 400,
    message: `Timed out fetching a new connection from the connection pool.`,
  },
  P2025: {
    status: 404,
    message: `An operation failed because it depends on one or more records that were required but not found.`,
  },
  P2026: {
    status: 400,
    message: `The current database provider doesn't support a feature that the query uses.`,
  },
  P2027: {
    status: 400,
    message: `Multiple errors occurred on the database during query execution.`,
  },
  P2028: {
    status: 400,
    message: `Transaction API error.`,
  },
  P2029: {
    status: 400,
    message: `Query parameter limit exceeded.`,
  },
  P2030: {
    status: 400,
    message: `Cannot find a fulltext index to use for the search.`,
  },
  P2031: {
    status: 400,
    message: `Prisma needs to perform a transaction, but the database does not support transactions.`,
  },
  P2033: {
    status: 400,
    message: `A number used in the query does not fit into a 64-bit signed integer.`,
  },
  P2034: {
    status: 503,
    message: `Too many connections are open to the database.`,
  },
  P2035: {
    status: 400,
    message: `A constraint failed on the database.`,
  },
};
