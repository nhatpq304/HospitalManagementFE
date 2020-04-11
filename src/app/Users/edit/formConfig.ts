const formConfig = {
  name: {
    controlName: "name",
    title: "Họ và tên"
  },
  email: {
    controlName: "email",
    title: "Email",
    type: "email"
  },
  password: {
    controlName: "password",
    title: "Mật Khẩu",
    type: "password"
  },
  gender: {
    controlName: "gender",
    title: "Giới tính",
    options: [
      { title: "Vui lòng chọn giới tính" },
      { title: "Nam", value: "1" },
      { title: "Nữ", value: "0" }
    ]
  },
  department: {
    controlName: "gender",
    title: "Giới tính",
    options: [
      { title: "Vui lòng chọn giới tính" },
      { title: "Nam", value: "1" },
      { title: "Nữ", value: "0" }
    ]
  },
  birthday: {
    controlName: "birthday",
    title: "Ngày sinh"
  },
  phone: {
    controlName: "phone",
    title: "SĐT"
  },
  address: {
    controlName: "address",
    title: "Địa chỉ"
  },
  idCard: {
    controlName: "idCard",
    title: "Số CMND"
  },
  medicalCard: {
    controlName: "medicalCard",
    title: "Số BHYT"
  }
};
export default formConfig;
