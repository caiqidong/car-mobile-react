import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  ReactNode,
} from "react";
import classNames from "classnames";
import LoadingIcon from "../loadingIcon";
import { mergeProps } from "../../utils/with-default-props";
import { withNativeProps } from "../../utils/native-props";
import { isPromise } from "../../utils/validate";
import type { NativeProps } from "../../utils/native-props";

type NativeButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type ButtonProps = {
  title?: string | ReactNode;
  mode?: "default" | "fill" | "white" | "grey" | "glass" | "linear";
  type?: "submit" | "reset" | "button";
  color?: string | string[] | (() => string | string[]);
  // color?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  fill?: "solid" | "outline" | "inverted" | "none";
  size?: "mini" | "small" | "medium" | "large";
  block?: boolean;
  loading?: boolean | "auto";
  loadingText?: string;
  loadingIcon?: ReactNode;
  disabled?: boolean;
  containerStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void | Promise<void>;
  shape?: "default" | "rounded" | "rectangular";
} & Pick<
  NativeButtonProps,
  "onMouseDown" | "onMouseUp" | "onTouchStart" | "onTouchEnd" | "id"
> &
  NativeProps<
    | "--text-color"
    | "--background-color"
    | "--border-radius"
    | "--border-width"
    | "--border-style"
    | "--border-color"
  >;

export type ButtonRef = {
  nativeElement: HTMLButtonElement | null;
};

const classPrefix = `car-button`;

const defaultProps = {
  mode: "default",
  color: "primary",
  fill: "solid",
  block: false,
  loading: false,
  loadingIcon: <LoadingIcon />,
  type: "button",
  shape: "rounded",
  size: "middle",
  disabled: false,
};

export const Button = forwardRef<ButtonRef, ButtonProps>((p, ref) => {
  const props = mergeProps(defaultProps, p) as ButtonProps;
  const [innerLoading, setInnerLoading] = useState(false);
  const nativeButtonRef = useRef<HTMLButtonElement>(null);
  const loading = props.loading === "auto" ? innerLoading : props.loading;
  // const disabled = props.disabled || loading;
  const disabled = props.disabled;

  useImperativeHandle(ref, () => ({
    get nativeElement() {
      return nativeButtonRef.current;
    },
  }));

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!props.onClick) return;
    const promise = props.onClick(e);
    if (isPromise(promise)) {
      try {
        setInnerLoading(true);
        await promise;
        setInnerLoading(false);
      } catch (e) {
        setInnerLoading(false);
        throw e;
      }
    }
  };

  return withNativeProps(
    props,
    React.createElement(
      "button",
      {
        ref: nativeButtonRef,
        type: props.type,
        onClick: handleClick,
        className: classNames(
          classPrefix,
          {
            [`${classPrefix}-${props.mode}`]: props.mode,
            [`${classPrefix}-fill-${props.fill}`]: props.mode === "fill",
            [`${classPrefix}-${props.color}`]: props.color,
            [`${classPrefix}-block`]: props.block,
            [`${classPrefix}-disabled`]: disabled,
            // [`${classPrefix}-fill-outline`]: props.fill === 'outline',
            // [`${classPrefix}-fill-none`]: props.fill === 'none',
            [`${classPrefix}-${props.size}`]: props.size,
            // [`${classPrefix}-mini`]: props.size === "mini",
            // [`${classPrefix}-small`]: props.size === "small",
            // [`${classPrefix}-large`]: props.size === "large",
            [`${classPrefix}-loading`]: loading,
          },
          `${classPrefix}-shape-${props.shape}`
        ),
        disabled: disabled || loading,
        onMouseDown: props.onMouseDown,
        onMouseUp: props.onMouseUp,
        onTouchStart: props.onTouchStart,
        onTouchEnd: props.onTouchEnd,
      },
      React.createElement(
        "div",
        {
          className: `${classPrefix}-content`,
        },
        loading &&
          React.createElement(
            "div",
            {
              className: `${classPrefix}-loading-wrapper`,
            },
            React.isValidElement(props.loadingIcon) ? (
              props.loadingIcon
            ) : (
              <LoadingIcon size={props.size ?? "medium"} />
            ),
            props.loadingText
          ),
        React.createElement("span", null, props.title)
      )
    )
  );
});

Button.displayName = "Button";
