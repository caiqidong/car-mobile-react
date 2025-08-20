import React from "react";
import "./loadingIcon.css";
import { withNativeProps, NativeProps } from "@/utils/native-props";
import loadingImage from "./assets/loading.webp";
import LoadingSvg from "./assets/loading.svg?react";
import classNames from "classnames";
const classPrefix = "car-loading-icon";

export interface LoadingIconProps extends NativeProps {
  /** 大小 */
  size?: "small" | "medium" | "large";
  /** 颜色 */
  color?: string;
  /** 图片样式 */
  imageStyle?: React.CSSProperties;
  /**style:图片大小 */
  "--image-size"?: React.CSSProperties;
}

/** 用于页面和区块的加载中状态。 */
export const LoadingIcon = (props: LoadingIconProps) => {
  function renderImageNode() {
    const { color } = props;
    if (color === undefined) {
      return React.createElement("img", {
        className: `${classPrefix}-image`,
        style: props.imageStyle,
        src: loadingImage,
        alt: "laoding-icon",
      });
    }
    if (typeof color === "string") {
      return React.createElement(LoadingSvg, {
       className: `${classPrefix}-image`,
        style: { ...props.imageStyle, color: props.color },
      });
    }
    return loadingImage;
  }

  return withNativeProps(
    props,
    React.createElement(
      "div",
      {
        className: classNames(classPrefix, {
          [`${classPrefix}-small`]: props.size === "small",
          [`${classPrefix}-medium`]: props.size === "medium",
          [`${classPrefix}-large`]: props.size === "large",
        }),
      },
      renderImageNode()
    )
  );
};
