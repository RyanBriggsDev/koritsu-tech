import { useAuth } from "../../contexts/AuthContext";
import ProtectedRoute from "../../components/functional/ProtectedRoute";

function AccountProfile() {
  const { state } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex justify-center items-center">
        <h1>Hey, {state.user?.name ? state.user.name : "Hey there"}!</h1>
      </div>
    </ProtectedRoute>
  );
}

export default AccountProfile;
