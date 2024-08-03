import { useAuth } from "../../contexts/AuthContext";

function AccountProfile() {
  const { state } = useAuth();
  console.log(state.user);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1>Hey, {state.user?.name ? state.user.name : "Hey there"}!</h1>
    </div>
  );
}

export default AccountProfile;
