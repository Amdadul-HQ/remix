export const action = async ({request} : {request :Request}) =>{
      const formData = await request.formData();
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      console.log(email, password);
      return {email,password};
} 