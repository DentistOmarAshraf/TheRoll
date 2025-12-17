export const formData = {
  fullName: "",
  email: "",
  password: "",
  confirmPass: "",
  phone: "",
  university: "",
  grade: "",
  syndicateId: "",
  file: null,
};

export function formReducer(state, action) {
  const { type, name, value, file } = action;
  switch (type) {
    case "CHANGE":
      return { ...state, [name]: value };
    case "SET_FILE":
      return { ...state, file: file };
    default:
      return state;
  }
}
