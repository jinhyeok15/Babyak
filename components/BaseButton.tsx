import { Button as MuiButton, type ButtonProps } from "@mui/material"

export const Button = (props: ButtonProps) => {
  return (
    <MuiButton
      {...props}
      className={`bg-yellow text-contrast ${props.className}`}
    />
  )
}
