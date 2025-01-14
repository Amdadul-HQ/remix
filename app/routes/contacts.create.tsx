import { Form, json, redirect } from "@remix-run/react";
import { createEmptyContact } from "~/data";

export const action = async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const first = formData.get('first') as string;
    const last = formData.get('last') as string;
    const avatar = formData.get('avatar') as string;
    const twitter = formData.get('twitter') as string;
    const notes = formData.get('notes') as string;
    const newUser = {
      first,
      last,
      avatar,
      twitter,
      notes
    };
    const contact = await createEmptyContact(newUser);
    return redirect(`/contacts/${contact.id}`);
  return json({ contact });
};
const ContactCreate = () => {
    return (
      <Form id="contact-form" method="POST">
        <p>
          <span>Name</span>
          <input
            aria-label="First name"
            //   defaultValue={contact.first}
            name="first"
            placeholder="First"
            type="text"
          />
          <input
            aria-label="Last name"
            //   defaultValue={contact.last}
            name="last"
            placeholder="Last"
            type="text"
          />
        </p>
        <label>
          <span>Twitter</span>
          <input
            //   defaultValue={contact.twitter}
            name="twitter"
            placeholder="@jack"
            type="text"
          />
        </label>
        <label>
          <span>Avatar URL</span>
          <input
            aria-label="Avatar URL"
            //   defaultValue={contact.avatar}
            name="avatar"
            placeholder="https://example.com/avatar.jpg"
            type="text"
          />
        </label>
        <label>
          <span>Notes</span>
          <textarea
            // defaultValue={contact.notes}
            name="notes"
            rows={6}
          />
        </label>
        <p>
          <button type="submit">Add</button>
          <button type="button">Cancel</button>
        </p>
      </Form>
    );
};

export default ContactCreate;