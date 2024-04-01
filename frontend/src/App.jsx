import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./components/userCard";
import Modal from "react-modal";

function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("");
  const [gender, setGender] = useState("");
  const [availability, setAvailability] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ... existing functions ...

  const openModal = async () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [team, setTeam] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [success, setSuccess] = useState(false);
  const [teams, setTeams] = useState([]);

  // ... existing functions ...

  const createTeam = async () => {
    if (team.length > 0 && teamName !== "") {
      const res = await axios.post("https://api-heliverse.vercel.app/api/team", {
        name: teamName,
        users: team.map((user) => user.first_name + " " + user.last_name),
      });
      console.log(res.data); // Log the response for now
      alert("Team created successfully");
      setSuccess(true);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        `https://api-heliverse.vercel.app/api/users?page=${page}&limit=20&search=${search}&domain=${domain}&gender=${gender}&availability=${availability}`
      );
      setUsers(res.data);
    };
    const fetchTeams = async () => {
      const res = await axios.get("https://api-heliverse.vercel.app/api/team");

      setTeams(res.data);
      console.log(res.data);
    };

    fetchTeams();
    fetchUsers();
  }, [page, search, domain, gender, availability, success]);

  return (
    <div className="m-5 ">
      <div className="m-5 flex flex-wrap justify-center ">
        <div className="flex gap-2 justify-center items-center">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="m-4 p-2  border rounded-lg border-gray-300"
          />

          <button
            className="border rounded-lg text-sm border-gray-300 p-2"
            onClick={openModal}
          >
            Show team
          </button>
        </div>
        <div className="flex justify-center text-sm items-center lg:m-2 gap-1">
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className=" border rounded-lg border-gray-300  p-2"
          >
            <option value="">All Domains</option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="Management">Management</option>
            <option value="Sales">Sales</option>
            {/* Add more options as needed */}
          </select>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className=" border rounded-lg border-gray-300   p-2"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className=" border rounded-lg border-gray-300   p-2"
          >
            <option value="">All Availabilities</option>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Team Modal"
        >
          <button
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              textAlign: "center",
              lineHeight: "30px",
              cursor: "pointer",
            }}
          >
            &#10005;
          </button>
          {success ? (
            <div>
              <p>Team created successfully!</p>
              <h2>Created Team</h2>
              <div className="flex max-md:flex-col">
                {team.map((user) => (
                  <div
                    className="border border-gray-200 p-2 rounded-md m-2"
                    key={user._id}
                  >
                    <b>
                      Name: {user.first_name} {user.last_name}
                    </b>
                    <p>Domain: {user.domain}</p>
                    <p>
                      Availability:{" "}
                      {user.available ? "Available" : "Not Available"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h2>Team Details</h2>
              <input
                type="text"
                placeholder="Enter team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="m-4 p-2  border rounded-lg border-gray-300"
              />
              <button
                className="border rounded-lg border-gray-300 p-2"
                onClick={createTeam}
              >
                Create team
              </button>
              <div className="flex max-md:flex-col">
                {team.map((user) => (
                  <div
                    className="border border-gray-200 p-2 rounded-md m-2"
                    key={user._id}
                  >
                    <b>
                      Name: {user.first_name} {user.last_name}
                    </b>
                    <p>Domain: {user.domain}</p>
                    <p>
                      Availability:{" "}
                      {user.available ? "Available" : "Not Available"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mt-4">
            <h2 className="text-lg font-bold mb-2">All Teams</h2>
            {teams.map((team) => (
              <div
                key={team._id}
                className="border border-gray-200 p-2 rounded-md m-2"
              >
                <h3 className="font-medium text-blue-600">{team.name}</h3>
                {team.users.map((user) => (
                  <li key={user._id} className="text-gray-700 list-disc ml-4">
                    {user}
                  </li>
                ))}
              </div>
            ))}
          </div>
        </Modal>
      </div>

      <div className="flex flex-wrap justify-around">
        {users.map((user) => (
          <div key={user._id}>
            <UserCard
              user={user}
              team={team}
              setTeam={setTeam}
              modal={openModal}
              success={setSuccess}
            />
          </div>
        ))}
      </div>

      {/* Existing pagination buttons... */}
      <div className="m-4 flex justify-center items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
