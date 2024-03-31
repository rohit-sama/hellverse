const UserCard = ({ user, team, setTeam, modal }) => {
  // Function to add a user to the team
  const addToTeam = (user) => {
    if (
      !team.some(
        (teamUser) =>
          teamUser.domain === user.domain &&
          teamUser.available === user.available
      )
    ) {
      setTeam([...team, user]);
      modal()
    }
  };

  // Function to remove a user from the team
  const removeFromTeam = (userId) => {
    setTeam(team.filter((user) => user._id !== userId));
    modal()
  };

  // Function to create the team

  return (
    <div className="w-64 h-80 rounded-lg overflow-hidden shadow-md border border-gray-100  m-4">
      <div className="px-6 py-4">
        <div className="font-bold flex justify-start items-center text-xl mb-2">
          <div className="mt-4">
            <img src={user.avatar} alt="Avatar" />
          </div>
          {user.first_name} {user.last_name}
        </div>
        <p className="text-gray-700 text-base">Email: {user.email}</p>
        <p className="text-gray-700 text-base">Gender: {user.gender}</p>
        <p className="text-gray-700 text-base">Domain: {user.domain}</p>
        <p className="text-gray-700 text-base">
          Available: {user.available ? "Yes" : "No"}
        </p>
        <div className="flex gap-1">
          <button
            className={`bg-blue-500 text-white font-bold p-1 text-sm rounded-lg mt-4 ${
              !user.available
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700"
            }`}
            onClick={() => addToTeam(user)}
            disabled={!user.available}
          >
            Add to team
          </button>
          <button
            className={`bg-red-500 text-white font-bold p-1 text-sm rounded-lg mt-4 ${
              !user.available
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-red-700"
            }`}
            onClick={() => removeFromTeam(user._id)}
            disabled={!user.available}
          >
            Remove from team
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
