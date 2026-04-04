declare module "papaparse" {
  const Papa: {
    parse<T>(input: string, config: {
      header?: boolean;
      skipEmptyLines?: boolean;
      transformHeader?: (header: string) => string;
    }): { data: T[] };
  };

  export default Papa;
}
