/**
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {Object} [props.value] - Additional context values (theme, reducedMotion, etc.)
 */
export function UIProvider({ children, value }: {
    children: React.ReactNode;
    value?: any;
}): import("react/jsx-runtime").JSX.Element;
export function useUI(): any;
import React from 'react';
