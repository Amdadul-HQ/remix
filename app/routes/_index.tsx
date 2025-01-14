import { MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const meta :MetaFunction = () => {
    return [
        {title:"Login Remix"},
        { name: "description", content: "Welcome to Remix!" },
    ]
}


const Index = () => {
    return (
      <div className="max-w-96 mx-auto h-screen flex justify-center items-center">
        <Form method="POST" className="w-full bg-blue-100 px-8 py-5 rounded-lg">
          <div className="mt-2 flex flex-col w-full">
            <label htmlFor="email">email</label>
            <input className="py-2 px-3 rounded-xl outline-none" type="email" id="email" name="email" />
          </div>
          <div className="mt-2 flex flex-col w-full">
            <label htmlFor="password">Password</label>
            <input className="py-2 px-3 rounded-xl outline-none" type="password" id="password" name="password" />
          </div>
          <button className="mt-3 px-4 py-2 bg-red-200 rounded-xl" type="submit">Loging</button>
        </Form>
      </div>
    );
};

export default Index;