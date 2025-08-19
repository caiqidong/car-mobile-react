import React from "react";
import "./empty.scss";
import classNames from "classnames";
import { withNativeProps, NativeProps } from "@/utils/native-props";

import emptyImg from "./assets/empty.webp";
import emptyBoxImg from "./assets/empty_box.webp";
import errorImg from "./assets/error.webp";
import lockImg from "./assets/lock.webp";
import waitingImg from "./assets/waiting.webp";
import noticeImg from "./assets/notice.webp";

const classPrefix = `car-empty`;

const Images = {
  Empty: emptyImg,
  EmptyBox: emptyBoxImg,
  Error: errorImg,
  Lock: lockImg,
  Waiting: waitingImg,
  Notice: noticeImg,
} as { [key: string]: string };

export interface EmptyProps extends NativeProps {
  /** 图片 */
  image?: keyof typeof Images | string;
  /** 描述 */
  description?: React.ReactNode;
  /** 内容 */
  children?: React.ReactNode;
  /** 容器样式 */
  containerStyle?: React.CSSProperties;
  /** 描述样式 */
  textStyle?: React.CSSProperties;
  /** 图片样式 */
  imageStyle?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 是否为整页异常 */
  fullPage?: boolean;
  /**style:整页模式下的图片宽度 */
  '--image-width-full-page'?: React.CSSProperties;
  /**style:整页模式下的图片高度 */
  '--image-height-full-page'?: React.CSSProperties;
}

/** 使用场景插画表示页面异常或空状态。 */
export const Empty = (props: EmptyProps) => {
  function renderImageNode() {
    const { image } = props;
    if (image === undefined) {
      return React.createElement("img", {
        className: `${classPrefix}-image`,
        style: props.imageStyle,
        src: Images.Empty,
        alt: "empty",
      });
    }
    if (typeof image === "string") {
      return React.createElement("img", {
        className: `${classPrefix}-image`,
        style: props.imageStyle,
        src: image,
        alt: "empty",
      });
    }
    return image;
  }

  return withNativeProps(
    props,
    React.createElement(
      "div",
      {
        className: classNames(classPrefix, {
          [`${classPrefix}-full-page`]: props.fullPage,
        }),
        style: props.containerStyle,
      },
      React.createElement(
        "div",
        {
          className: `${classPrefix}-image-container`,
        },
        renderImageNode()
      ),
      props.description &&
        React.createElement(
          "div",
          {
            className: classNames(`${classPrefix}-description`),
            style: props.textStyle,
          },
          props.description
        ),
      props.children &&
        React.createElement(
          "div",
          {
            className: classNames(`${classPrefix}-actions`),
          },
          props.children
        )
    )
  );
};

Empty.Images = Images;
