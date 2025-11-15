import styles from "./TemplateContainer.module.css";
import TextOptionProvider from "./context/TextOptionTooltipContext";
import ResizeContextProvider from "./context/ResizeContext";

export default function TemplateContainer({
  children,
  className,
  width,
  height,
}) {
  const A4_ratio = 1.48;

  let finalWidth = width;
  let finalHeight = height;

  if (!finalWidth) {
    finalWidth = 400;
  }

  if (finalHeight / finalWidth < A4_ratio || !height) {
    finalHeight = finalWidth * A4_ratio;
  }

  const finalStyle = {
    width: `${finalWidth}px`,
    height: `${finalHeight}px`,
  };

  return (
    <TextOptionProvider>
      <ResizeContextProvider>
        <div
          className={`${styles.template_container} ${className || ""}`}
          style={finalStyle}
        >
          {children}
        </div>
      </ResizeContextProvider>
    </TextOptionProvider>
  );
}
