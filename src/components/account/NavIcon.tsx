import Button from "../small/Button";

function NavIcon() {
  return (
    <Button className="btn btn-ghost btn-circle">
      <div className="avatar placeholder">
        <div className="bg-neutral text-neutral-content w-8 rounded-full">
          <span className="text-xs">RB</span>
        </div>
      </div>
    </Button>
  );
}

export default NavIcon;
