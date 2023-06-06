import { selectAuth, selectUser } from "@/state/features/auth/authSelectors";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/components/Profile.module.scss";
import { setLogout } from "@/state/features/auth/authSlice";

import { clearBookmarks } from "@/state/features/bookmarks/bookmarksSlice";
import Button from "@/components/Button";
import Link from "next/link";

const Profile = () => {
  const { user } = useSelector(selectAuth);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(clearBookmarks());
    dispatch(setLogout());
  };

  return (
    <div className={styles.profile}>
      {user ? (
        <>
          <h2>Welcome, {user.displayName}!</h2>

          <Button onClick={() => handleLogOut()}>LogOut</Button>
        </>
      ) : (
        <>
          <h2>Welcome, guest!</h2>
          <Link href="sign-in">
            <Button onClick={() => handleLogOut()}>Sign In</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Profile;
