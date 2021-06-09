import Link, { LinkProps } from "next/link";
import React from "react";

/*
    When next/link is passed into LinkComponent for the Button, it's passed two children - which throws an exception.
    This is a lightweight wrapper to pass it just an `a` tag like it is expecting
*/
const ButtonLink: React.FC<LinkProps> = ({ children, href, ...props }) => (
  <Link href={href}>
    <a {...props}>{children}</a>
  </Link>
);

export default ButtonLink