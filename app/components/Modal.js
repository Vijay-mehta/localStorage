import { useEffect, userId, useState } from "react";

const Modal = ({ currentUser, setIsModal, setUserData }) => {
  console.log("444", currentUser);

  const [edit, setEdit] = useState({
    name: "",
    email: "",
    userId: "",
  });

  useEffect(() => {
    setEdit(currentUser);
  }, [currentUser]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setEdit((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let userData = JSON.parse(localStorage.getItem("user")) ?? [];
    let newData = userData.map((item) =>
      item.userId === currentUser.userId ? edit : item
    );
    localStorage.setItem("user", JSON.stringify(newData));
    setUserData(newData);
    setIsModal(false);
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm bg-black">
      <div className=" flex flex-col">
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col w-[500px]   m-auto  mt-20 bg-white p-5"
        >
          <h1 className=" font-bold text-2xl text-center mb-5">Edite User</h1>
          <span
            className="cursor-pointer text-end   text-4xl"
            onClick={() => setIsModal(false)}
          >
            &times;
          </span>

          <input
            type="text"
            value={edit.name}
            onChange={handleChange}
            name="name"
            className="border-2 m-3 p-2 "
          />
          <input
            type="email"
            name="email"
            value={edit.email}
            onChange={handleChange}
            className="border-2 mx-3 p-2"
          />
          <input
            type="number"
            value={edit.userId}
            name="userId"
            onChange={handleChange}
            className="border-2 mx-3 my-2 p-2"
          />

          <div className=" text-center ">
            <button
              type="submit"
              className="bg-black text-white w-[100px] px-2 py-3 mt-2 "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
