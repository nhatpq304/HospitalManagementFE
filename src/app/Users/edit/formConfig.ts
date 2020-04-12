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
  password: {
    controlName: "password",
    title: "Mật Khẩu",
    type: "password",
  },
  confirmPassword: {
    controlName: "confirmPassword",
    title: "Nhập lại mật Khẩu",
    type: "password",
  },
  gender: {
    controlName: "gender",
    title: "Giới tính",
    options: [
      { title: "Nam", value: "1" },
      { title: "Nữ", value: "0" },
    ],
  },
  department: {
    controlName: "department",
    title: "Khoa",
    options: [
      { title: "Vui lòng chọn khoa" },
      { title: "Khoa tim", value: "CARDIOLOGY" },
      { title: "Khoa da liễu", value: "DERMATOLOGY" },
      { title: "Khoa dinh dưỡng", value: "DIETETICS" },
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
};
export default formConfig;