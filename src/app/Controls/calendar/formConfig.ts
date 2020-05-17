const formConfig = {
  date: {
    title: "Ngày",
    controlName: "date",
    required: true,
  },
  from: {
    title: "Từ lúc",
    isTimePicker: true,
    controlName: "from",
    required: true,
  },
  to: {
    title: "Đến lúc",
    isTimePicker: true,
    controlName: "to",
    required: true,
  },
  searchDoctor: {
    required: true,
    searchDoctor: true,
    controlName: "searchDoctor",
  },
  searchPatient: {
    controlName: "searchPatient",
    required: true,
  },
};

export default formConfig;
