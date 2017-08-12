import * as React from 'react'
import { IconComponentProps } from "./icon.interfaces";

export const Icon = (props: IconComponentProps) => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
    >
        <path
            d={props.path}
            fill={props.fill}
        >
        </path>
    </svg>
);
