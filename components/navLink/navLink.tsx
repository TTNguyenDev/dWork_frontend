import Link from "next/link";
import React from "react";
import classes from "./navLink.module.less";

type NavLinkProps = {
  href: string;
};

export const NavLink: React.FunctionComponent<NavLinkProps> = ({
  href,
  children,
}) => {
  return (
    <div className={classes.root}>
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </div>
  );
};
