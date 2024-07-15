import request from "@/utils/http-request";

export const signUp = async (formData: {
  firstName: string;
  lastName: string;
  phoneNo: string;
  email: string;
  password1: string;
  password2: string;
}) => {
  const uri = "/auth/registration/";
  try {
    console.log(formData)
    const result = await request.post(uri, formData);
    console.log(result);
    return result.data;
  } catch (error) {
    console.error("Error Signing up: ", error);
  }
};
