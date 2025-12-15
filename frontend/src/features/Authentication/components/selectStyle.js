export const SignUpSelectStyle = {
  // --- 1. Control (The main input box) ---
  control: (baseStyles, state) => ({
    ...baseStyles,
    height: "100%",
    minHeight: "100%",
    backgroundColor: "#F3F6FB",
    borderColor: "#F3F6FB",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#F3F6FB",
    },
  }),

  // --- 2. ValueContainer (The area where selected text/value sits) ---
  valueContainer: (baseStyles) => ({
    ...baseStyles,
    height: "100%",
    padding: "0",
  }),

  // --- 3. Menu (The dropdown list container) ---
  menu: (baseStyles) => ({
    ...baseStyles,
    width: "90%",
    border: "1px solid #F3F6FB",
    backgroundColor: "#F3F6FB",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  }),

  // --- 4. Option (Individual item in the dropdown) ---
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isSelected
      ? "#c1c5cdff"
      : state.isFocused
      ? "#d8dce2ff"
      : null,
    
    "&:active": {
      backgroundColor: state.isSelected
        ? "#99a1a8ff"
        : "#b4bac5ff",
    },
    
    color: "black",
    cursor: "pointer",
  }),
};