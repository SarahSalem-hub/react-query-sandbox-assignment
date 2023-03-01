import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export default function FormApp() {
  const queryClient = useQueryClient();
  const [lastName, setlastName] = useState("");
  const [firstName, setfirstName] = useState("");
  const [phoneNum, setphoneNum] = useState("");

  const mutation = useMutation({
    mutationFn: postcontacts,
    onSuccess: () => {
      queryClient.invalidateQueries("contacts");
    },
  });

  const { isLoading, isError, isSuccess, mutate, error } = mutation;

  function handleFormSubmit() {
    console.log(firstName);
    mutate({
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNum,
    });
  }

  return (
    <Form>
      <FormGroup onSubmit={handleFormSubmit}>
        {/* <FormGroup> */}
        <Label for="firstName">First Name</Label>
        <Input
          id="firstName"
          name="firstName"
          placeholder="First name"
          type="text"
          value={firstName}
          onChange={(e) => {
            setfirstName(e.target.value);
          }}
        />
        <Label for="firstName">Last Name</Label>
        <Input
          id="lastName"
          name="lastName"
          placeholder="Last name"
          type="text"
          value={lastName}
          onChange={(e) => {
            setlastName(e.target.value);
          }}
        />
        <Label for="examplephonenumber">Phone Number</Label>
        <Input
          id="examplePhonenumber"
          name="phonenumber"
          placeholder="Phone number"
          type="phonenumber"
          value={phoneNum}
          onChange={(e) => {
            setphoneNum(e.target.value);
          }}
        />
      </FormGroup>

      {isLoading || (
        <Button onClick={handleFormSubmit} color="primary">
          {" "}
          Add
        </Button>
      )}

      {isLoading && <p>saving...</p>}
      {isSuccess && <p>success</p>}
      {isError && <p>error</p>}
    </Form>
  );
}
export async function postcontacts(obj) {
  console.log(obj);
  const response = await fetch("http://localhost:3000/contacts", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...obj }),
  });
  const content = await response.json();
  console.log(content);
}
