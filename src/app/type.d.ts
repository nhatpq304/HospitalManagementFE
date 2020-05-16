interface datatableConfig {
  id: string;
  columns: Object[];
  drawCallback: Function;
  pageLength: number;
  searching: boolean;
  select: boolean;
  paging: boolean;
  info: boolean;
  lengthChange: boolean;
  initComplete: any;
  order: DynamicObject;
  columnDefs: any;
}

interface DynamicObject {
  [key: string]: string;
}
