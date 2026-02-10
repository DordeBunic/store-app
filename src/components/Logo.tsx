import logo from "@/assets/logo.png";
import { Link } from "react-router";
import { Typography } from "./ui/Text";

interface LogoProps {
  link: string;
}

const Logo = ({ link }: LogoProps) => {
  return (
    <Link
      className="flex gap-4 align-items-center  no-text-decoration"
      to={link}
    >
      <img src={logo} height="60px" />
      <Typography className="text-primary my-auto bold-text" size="lg">
        ShoppingApp
      </Typography>
    </Link>
  );
};

export default Logo;
