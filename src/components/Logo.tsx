import logo from "@/assets/logo.png";
import { Link } from "react-router";
import Text from "./ui/Text";

interface LogoProps {
  link: string;
}

const Logo = ({ link }: LogoProps) => {
  return (
    <Link
      className="flex gap-4 align-items-center  no-text-decoration"
      to={link}
    >
      <img src={logo} height="60px" alt="Company Logo" />
      <Text className="text-primary my-auto bold-text" size="lg">
        ShoppingApp
      </Text>
    </Link>
  );
};

export default Logo;
