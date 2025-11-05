import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      {...props}
    >
      <path fill="none" d="M0 0h256v256H0z"/>
      <path fill="currentColor" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Z"/>
      <path fill="currentColor" d="M164.63 112H144V92a12 12 0 0 0-24 0v20H91.37a12 12 0 1 0 0 24h18.26v4h-18.26a12 12 0 1 0 0 24h28.26V144a12 12 0 0 0 24 0v-4h20.63a12 12 0 1 0 0-24H144v-4h20.63a12 12 0 1 0 0-24Z"/>
    </svg>
  )
}
