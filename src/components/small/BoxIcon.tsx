interface BoxIconProps {
  type: string;
  size?: string;
  color?: string;
}

const BoxIcon: React.FC<BoxIconProps> = ({
  type,
  size = "24px",
  color = "currentColor",
}) => {
  const iconClass = `bx ${type}`;

  const styles = {
    fontSize: size,
    color: color,
  };

  return <i className={iconClass} style={styles}></i>;
};

export default BoxIcon;
