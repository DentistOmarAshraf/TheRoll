import { Link, useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { confirmUserEmail } from "../../api/userClient";
import styles from "./Authentication.module.css";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ConfirmEmail() {
  const { token } = useParams();
  const hasCalled = useRef(false); // The "Lock"
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("رابط التأكيد غير صالح أو مفقود.");
      return;
    }
    // If the lock is already true, stop here
    if (hasCalled.current) return;

    // Set the lock immediately
    hasCalled.current = true;

    const confirm = async () => {
      try {
        const data = await confirmUserEmail(token);
        setStatus((prev) => data.status);
        setMessage(
          (prev) =>
            `اهلا بك أ. ${data.data.fullName} تم تأكيد البريد الالكتروني`
        );
        toast.success("تم تأكيد البريد الالكتروني");
        setTimeout(() => {
          navigate("/auth");
        }, 3000);
      } catch (err) {
        setStatus((prev) => err.response.data.status);
        setMessage(
          (prev) =>
            err.response?.data?.message ||
            "حدث خطأ أثناء التأكيد. ربما انتهت صلاحية الرابط."
        );
      }
    };

    confirm();
  }, [token]);

  return (
    <div className={styles.main_container}>
      <h1>Roll01</h1>
      {/* Loading View */}
      {!status && (
        <div className={styles.email_message}>
          <Loader className={styles.spinner} />
          <p>جاري التحقق من بريدك الإلكتروني...</p>
        </div>
      )}

      {/* Message View */}
      {status && (
        <div className={styles.email_message}>
          {status === "success" && (
            <>
              <Loader className={styles.spinner} />
              <p>{message}</p>
              <p>
                سيتم الانتقال الى صفحه تسجيل الدخول او {" "}
                <Link to="/auth" className={styles.nav_link}>
                  اضغط هنا
                </Link>
              </p>
            </>
          )}

          {status === "error" && (
            <>
              <p>{message}</p>
              <p>
                لإعادة إرسال رابط التأكيد{" "}
                <Link to="/auth/resend" className={styles.nav_link_danger}>
                  اضغط هنا
                </Link>
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
