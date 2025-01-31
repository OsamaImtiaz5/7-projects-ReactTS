import * as React from "react";
import Button from "../Button";
import MainContainer from "../MainContainer";
import AppLayout from "../PersistentDrawer";
import CustomSwitch from "../Switch";

const PasswordGenerator = () => {
  // const [checked, setChecked] = React.useState(true);
  //   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  // setChecked(event.target.checked);
  //   };

  const [password, setPassword] = React.useState("");
  const [passwordLength, setPasswordLength] = React.useState("");
  const [includeUppercase, setIncludeUppercase] = React.useState(false);
  const [includeLowercase, setIncludeLowercase] = React.useState(false);
  const [includeNumbers, setIncludeNumbers] = React.useState(false);
  const [includeSpecialCharacters, setIncludeSpecialCharacters] =
    React.useState(false);
  const [passwordError, setPasswordError] = React.useState("");
  const generatePassword = () => {
    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSpecialCharacters
    ) {
      setPasswordError("At least one of the options must be selected");
      return;
    }
    setPasswordError("");
    let characters = "";
    if (includeUppercase) {
      characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (includeLowercase) {
      characters += "abcdefghijklmnopqrstuvwxyz";
    }
    if (includeNumbers) {
      characters += "0123456789";
    }
    if (includeSpecialCharacters) {
      characters += "!@#$%^&*()_+{}:\"<>?|[];',./`~";
    }
    let password = "";
    for (let i = 0; i < Number(passwordLength); i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setPassword(password);
  };
  return (
    <AppLayout>
      <MainContainer heading="Password Generator App">
        <div className=" text-white font-bold ">
          <div className="flex flex-col items-center">
            <div className="bg-purple-500/100 w-[350px] shadow-2xl hover:shadow-blue-500 rounded p-2">
              <div className="mb-4 flex justify-between items-center p-2">
                <label htmlFor="" className="">
                  Password Length
                </label>
                <input
                  type="number"
                  value={passwordLength}
                  onChange={(e) => setPasswordLength(e.target.value)}
                  className="w-20 pl-2 bg-purple-100/50 rounded"
                />
              </div>
              <CustomSwitch
                isChecked={includeUppercase}
                label="Include Uppercase Letters"
                onChange={setIncludeUppercase}
              />
              <CustomSwitch
                isChecked={includeLowercase}
                label="Include Lowercase Letters"
                onChange={setIncludeLowercase}
              />
              <CustomSwitch
                isChecked={includeNumbers}
                label="Include Numbers"
                onChange={setIncludeNumbers}
              />
              <CustomSwitch
                isChecked={includeSpecialCharacters}
                label="Include Special Charachters"
                onChange={setIncludeSpecialCharacters}
              />

              <Button onClick={generatePassword}>Generate</Button>
              {passwordError && <p>{passwordError}</p>}
              {password && <p>{password}</p>}
            </div>
          </div>
        </div>
      </MainContainer>
    </AppLayout>
  );
};

export default PasswordGenerator;
