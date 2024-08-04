import Button from "../small/Button";
import BoxIcon from "../small/BoxIcon";
import { useLocation, useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const handleBackClick = () => {
    if (path === "/") return;
    if (path === "/account/login") {
      navigate("/");
      return;
    }
    const segments = path.split("/").filter(Boolean);
    if (segments.length > 1) {
      segments.pop();
      navigate("/" + segments.join("/"));
    } else {
      navigate("/");
    }
  };

  if (path === "/") return null;

  return (
    <Button
      onClick={handleBackClick}
      className="back-button bg-primary text-primary fixed left-4 top-20 border border-secondary rounded-lg px-4 py-2"
    >
      <BoxIcon type="bx-arrow-back" size="20px" color="#fff" />
    </Button>
  );
};

export default BackButton;
