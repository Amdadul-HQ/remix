import { MetaFunction } from "@remix-run/node";
import { Form, useActionData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { addUser, findUserByEmailPassword, User } from "users";
import { v4 as uuidv4 } from "uuid";
type ActionData = {
  error?: string;
  user?: User;
};

export const meta :MetaFunction = () => {
    return [
        {title:"Login Remix"},
        { name: "description", content: "Welcome to Remix!" },
    ]
}

export const action = async ({request} : {request:Request}) =>{
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    

    if (!email || !password) {
        return Response.json(
        { error: "Email and password are required." },
        { status: 400 }
        );
    }

    const newUser = {
      id: uuidv4(),
      name,
      email,
      password,
    };

    const existingUser = findUserByEmailPassword(email, password);

    const user = existingUser || newUser;

    if (!existingUser) {
      addUser(user);
    }

    return Response.json({ user }, { status: 200 });

}

const Index = () => {
  const actionData = useActionData<ActionData>();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userLogged");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      location.pathname = `/profile/${user.id}`;
    }

    if (actionData?.user) {
      localStorage.setItem("userLogged", JSON.stringify(actionData.user));
      navigate(`/profile/${actionData.user.id}`);
    }
  }, [actionData, navigate]);
    return (
      <div className="max-w-96 mx-auto h-screen flex justify-center items-center">
        <Form method="POST" className="w-full bg-white px-8 py-5 rounded-lg">
          <div className="mt-2 flex flex-col w-full font-medium">
            <label htmlFor="name">Name</label>
            <input
              className="py-2 px-3 rounded-md border-black border text-black outline-none"
              type="text"
              id="name"
              name="name"
            />
          </div>
          <div className="mt-2 flex flex-col w-full font-medium">
            <label htmlFor="email">email</label>
            <input
              className="py-2 px-3 rounded-md border-black border text-black outline-none"
              type="email"
              id="email"
              name="email"
            />
          </div>
          <div className="mt-2 flex flex-col w-full font-medium">
            <label htmlFor="password">Password</label>
            <input
              className="py-2 px-3 rounded-md border-black border text-black outline-none"
              type="password"
              id="password"
              name="password"
            />
          </div>
          <button
            className="mt-3 px-4 py-2 bg-black text-white rounded-lg font-medium"
            type="submit"
          >
            Loging
          </button>
        </Form>
      </div>
    );
};

export default Index;