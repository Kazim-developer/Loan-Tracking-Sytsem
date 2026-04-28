const handleLogout = async () => {
  await fetch("http://localhost:5000/auth/logout", {
    method: "POST",
    credentials: "include",
  });
};

export default handleLogout;
