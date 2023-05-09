import React from "react";
import "./capsuleTag.less";

type Props = {
  content?: string;
  type?: "info" | "success" | "warning" | "danger" | string;
  backgroundColor?: string;
  suffix?: React.ReactNode;
}

const CapsuleTag: React.FC<Props> = ({
  content = "",
  type = "info",
  backgroundColor = "",
  suffix,
}) => {
  const bgColor = React.useMemo(() => {
    if (backgroundColor) {
      return backgroundColor;
    }
    switch (type) {
      case "info":
        return "#919cac";
      case "success":
        return "#00bf30";
      case "warning":
        return "#f18241";
      case "danger":
        return "#f56c6c";
      default:
        return "#dedede"; // default color -> type is not a recognized type
    }
  }, [backgroundColor, type]);

  return (
    <span className="capsule-tag" style={{ backgroundColor: bgColor }}>
      <div className="capsule-tag-group">
        <span className="content">{content}</span>
        <span className="suffix">{suffix}</span>
      </div>
    </span>
  );
};

export default CapsuleTag;
