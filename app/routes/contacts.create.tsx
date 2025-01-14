import { json } from "@remix-run/react";
import { createEmptyContact } from "~/data";

export const action = async () => {
  const contact = await createEmptyContact();
  return json({ contact });
};
const ContactCreate = () => {
    return (
        <div>
            <h1>Hello from create a contacts</h1>            
        </div>
    );
};

export default ContactCreate;