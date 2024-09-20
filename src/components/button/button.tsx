import { Button as ReactAriaButton, ButtonProps } from "react-aria-components";
import { cx } from "../../utils/cx";

interface Props {
    form?: ButtonProps["form"];
    formAction?: ButtonProps["formAction"];
    isDisabled?: boolean;
    isIconButton?: boolean;
    label?: string;
    onClick?: () => void;
    size?: "small" | "default" | "large";
    type?: ButtonProps["type"];
    variant?: "primary" | "outline" | "ghost";
}

export function Button(props: Props) {
    return (
        <ReactAriaButton
            className={({ isDisabled, isFocusVisible, isFocused, isHovered, isPressed }) =>
                cx(
                    "button",
                    `button--size-${props.size ?? "default"}`,
                    `button--variant-${props.variant ?? "primary"}`,
                    props.isIconButton && "is-icon-button",
                    isDisabled && "is-disabled",
                    isFocusVisible && "is-focus-visible",
                    isFocused && "is-focused",
                    isHovered && "is-hovered",
                    isPressed && "is-pressed",
                )
            }
            form={props.form}
            formAction={props.formAction}
            isDisabled={props.isDisabled}
            onPress={props.onClick}
            type={props.type}
        >
            {props.isIconButton ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M22 9.6699C21.9368 9.48699 21.822 9.32633 21.6693 9.2074C21.5167 9.08848 21.3328 9.0164 21.14 8.9999L15.45 8.1699L12.9 2.9999C12.8181 2.83083 12.6902 2.68824 12.5311 2.58847C12.3719 2.48871 12.1878 2.43579 12 2.43579C11.8121 2.43579 11.6281 2.48871 11.4689 2.58847C11.3097 2.68824 11.1819 2.83083 11.1 2.9999L8.54998 8.1599L2.85998 8.9999C2.6749 9.02621 2.5009 9.10386 2.35773 9.22406C2.21455 9.34425 2.10794 9.50218 2.04998 9.6799C1.99692 9.85358 1.99216 10.0384 2.03621 10.2146C2.08025 10.3908 2.17144 10.5516 2.29998 10.6799L6.42998 14.6799L5.42998 20.3599C5.39428 20.5474 5.41297 20.7412 5.48385 20.9184C5.55473 21.0955 5.67483 21.2488 5.82998 21.3599C5.98119 21.468 6.15955 21.5318 6.34503 21.5442C6.5305 21.5566 6.71575 21.517 6.87998 21.4299L12 18.7599L17.1 21.4399C17.2403 21.5191 17.3988 21.5604 17.56 21.5599C17.7718 21.5607 17.9784 21.4941 18.15 21.3699C18.3051 21.2588 18.4252 21.1055 18.4961 20.9284C18.567 20.7512 18.5857 20.5574 18.55 20.3699L17.55 14.6899L21.68 10.6899C21.8244 10.5676 21.9311 10.4068 21.9877 10.2262C22.0444 10.0457 22.0486 9.85278 22 9.6699ZM15.85 13.6699C15.7327 13.7833 15.645 13.9237 15.5944 14.0789C15.5439 14.234 15.532 14.3992 15.56 14.5599L16.28 18.7499L12.52 16.7499C12.3753 16.6729 12.2139 16.6326 12.05 16.6326C11.8861 16.6326 11.7247 16.6729 11.58 16.7499L7.81998 18.7499L8.53998 14.5599C8.56791 14.3992 8.55609 14.234 8.50554 14.0789C8.45499 13.9237 8.36725 13.7833 8.24998 13.6699L5.24998 10.6699L9.45998 10.0599C9.62198 10.0374 9.77598 9.97544 9.90848 9.87955C10.041 9.78366 10.1479 9.65674 10.22 9.5099L12 5.6999L13.88 9.5199C13.952 9.66674 14.059 9.79366 14.1915 9.88955C14.324 9.98544 14.478 10.0474 14.64 10.0699L18.85 10.6799L15.85 13.6699Z"
                        fill="var(--icon-color)"
                    />
                </svg>
            ) : (
                props.label ?? "Button"
            )}
        </ReactAriaButton>
    );
}
