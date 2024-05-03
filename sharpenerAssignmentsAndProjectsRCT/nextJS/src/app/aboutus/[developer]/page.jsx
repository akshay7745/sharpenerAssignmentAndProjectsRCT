const Developer = ({ params }) => {
  const details = [
    { id: 1, name: "Yash", role: "Senior Developer" },
    { id: 2, name: "Vaibhav", role: "Backend Developer" },
    { id: 3, name: "Suresh", role: "Frontend Developer" },
  ];
  // console.log(params.developer);
  const user = details.find((item) => item.id === +params.developer);
  return user ? (
    <h2>
      <span>{user.name} </span> <span>{user.role}</span>
    </h2>
  ) : (
    <h2>Developer doesn't exist</h2>
  );
};

export default Developer;
