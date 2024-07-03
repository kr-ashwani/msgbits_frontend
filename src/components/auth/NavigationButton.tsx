"use client";
import { useAppSelector } from "@/lib/store/hooks";
import LogOut from "./LogOut";
import Button from "../utility/Button";

const NavigationButton = (props: { nav: { label: string; link: string } }) => {
  const user = useAppSelector((state) => state.auth.user);
  if (user) return <LogOut />;
  else return <Button navigateTo={props.nav.link}>{props.nav.label}</Button>;
};

export default NavigationButton;
