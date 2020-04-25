interface datatableConfig {
  id: string;
  columns: Object[];
  drawCallback: Function;
  pageLength: number;
}

interface DynamicObject {
  [key: string]: string;
}
