declare module "node-snowflake" {
  interface SnowflakeOptions {
    workerId?: number;
    datacenterId?: number;
    sequence?: number;
    epoch?: number | bigint | Date;
  }

  class Snowflake {
    constructor(options?: SnowflakeOptions);
    generate(): bigint;
  }

  export { Snowflake };
}
