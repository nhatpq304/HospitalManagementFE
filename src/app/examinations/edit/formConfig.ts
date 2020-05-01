const formConfig = {
  name: {
    controlName: "name",
    title: "Họ và tên",
    required: true,
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
    required: true,
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
};
export default formConfig;
