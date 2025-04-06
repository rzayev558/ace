import Link from "next/link";
import { Menu } from "antd";

const Navbar = () => {
  const items = [
    {
      key: "home",
      label: <Link href="/">Home</Link>,
      style: { marginRight: "auto", padding:"10px" },
    },
    {
      key: "advantages",
      label: <Link href="/advantages">Advantages</Link>,
      style: { marginLeft: "auto" , padding:"10px"},
    },
  ];

  return <Menu mode="horizontal" theme="light" items={items} />;
};

export default Navbar;