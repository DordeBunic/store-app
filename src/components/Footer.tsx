import { Link } from "react-router";
import { Typography } from "./ui/Text";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import ImageText from "./ImageText";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="bg-subtile flex gap-6 py-4 justify-content-center">
      <footer>
        <Typography className="text-base text-color-secondary text-align-center">
          © {year} <b>Đorđe Bunić</b>
        </Typography>

        <div className="flex gap-2 align-items-center">
          <Link
            className="flex gap-3 justify-content-center text-primary"
            to="https://github.com/DordeBunic"
            target="_blank"
          >
            <ImageText type="primary" text="Github" horizontal>
              <FaGithub size={20} />
            </ImageText>
          </Link>

          <Typography className="bold-text">|</Typography>
          <Link
            className="flex gap-3 justify-content-center text-primary"
            to="https://www.linkedin.com/in/dordebunic"
            target="_blank"
          >
            <ImageText
              type="primary"
              text="LinkedIn"
              horizontal
              className="align-items-center"
            >
              <FaLinkedin size={20} />
            </ImageText>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
