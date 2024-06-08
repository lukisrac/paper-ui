import { Button as ReactAriaButton } from "react-aria-components";
import { cx } from "../../utils/cx";

interface Props {
    isDisabled?: boolean;
    label?: string;
    onClick?: () => void;
    size?: "small" | "default" | "large";
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
                    isDisabled && "is-disabled",
                    isFocusVisible && "is-focus-visible",
                    isFocused && "is-focused",
                    isHovered && "is-hovered",
                    isPressed && "is-pressed",
                )
            }
            isDisabled={props.isDisabled}
            onPress={props.onClick}
        >
            {props.label ?? "Button"}
        </ReactAriaButton>
    );
}
