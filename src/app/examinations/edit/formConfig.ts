const formConfig = {
  name: {
    controlName: "name",
    title: "Họ và tên",
  },
  email: {
    controlName: "email",
    title: "Email",
    type: "email",
  },
  gender: {
    controlName: "gender",
    options: [
      { title: "Giới tính", value: "", selected: true, disabled: true },
      { title: "Nam", value: "1" },
      { title: "Nữ", value: "0" },
    ],
  },
  birthday: {
    controlName: "birthday",
    title: "Ngày sinh",
  },
  phone: {
    controlName: "phone",
    title: "SĐT",
  },
  address: {
    controlName: "address",
    title: "Địa chỉ",
  },
  idCard: {
    controlName: "idCard",
    title: "Số CMND",
  },
  medicalCard: {
    controlName: "medicalCard",
    title: "Số BHYT",
  },
  avatar: {
    controlName: "avatar",
  },
  search: {
    controlName: "search",
    required: true,
  },
  //exam
  doctorName: {
    controlName: "doctorName",
    title: "Bác sĩ",
    required: true,
  },
  department: {
    controlName: "department",
    title: "Khoa",
    options: [
      {
        title: "Vui lòng chọn khoa*",
        value: "",
        selected: true,
        disabled: true,
      },
      { title: "Khoa tim", value: "CARDIOLOGY" },
      { title: "Khoa da liễu", value: "DERMATOLOGY" },
      { title: "Khoa dinh dưỡng", value: "DIETETICS" },
    ],
  },
  createDate: {
    controlName: "createDate",
    title: "Ngày tạo",
  },

  //basic health data
  bloodPresure: {
    controlName: "bloodPresure",
    title: "Huyết áp",
    suffix: "mmHg",
  },
  height: {
    controlName: "height",
    title: "Chiều cao",
    suffix: "cm",
  },
  weight: {
    controlName: "weight",
    title: "Cân nặng",
    suffix: "kg",
  },
  bodyTemp: {
    controlName: "bodyTemp",
    title: "Nhiệt độ",
    suffix: "\u2103",
  },
  examResult: {
    controlName: "examResult",
    title: "Kết quả chẩn đoán",
    rows: 5,
    required: true,
  },
};
export default formConfig;
