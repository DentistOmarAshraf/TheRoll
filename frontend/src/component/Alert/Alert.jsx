import { Toaster } from "react-hot-toast";

export default function Alert() {
  return (
    <Toaster
      toastOptions={{
        duration: 5000,
        style: {
          padding: "10px",
          maxWidth: "700px",
          borderRadius: "12px",
          direction: "rtl",
          fontFamily: '"Cairo", cursive',
          fontWeight: 650,
          fontStyle: "normal",
        },
        success: {
          style: {
            background: "#F0FDF4",
            border: "1px solid #86EFAC",
            color: "#166534",
          },
        },
        error: {
          style: {
            background: "#FEF2F2",
            border: "1px solid #FCA5A5",
            color: "#991B1B",
          },
        },
      }}
      position="top-center"
      reverseOrder={false}
    />
  );
}
