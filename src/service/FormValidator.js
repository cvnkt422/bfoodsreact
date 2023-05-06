const validateForm = (formData) => {
  let dob1;
  var passwordValidator = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  const emailValidator =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const {
    dob,
    gender,
    name,
    email,
    mobile,
    occupation,
    username,
    address1,
    city,
    aadhar,
    pan,
    state,
    pin,
    country,
    password,
    confirmpassword,
  } = formData;
  const newErrors = {};

  if (!password || password === "")
    //!passwordValidator.test(password))
    newErrors.password = "8 characters,1 number,1 upper 1 lowercase!";
  if (password !== confirmpassword)
    newErrors.confirmpassword = "Passwords Mismatch";
  if (!username || username === "") newErrors.username = "Enter Username";
  if (!address1 || address1 === "") newErrors.address1 = "Enter Address1";
  if (!name || name === "") newErrors.name = "Enter full name";
  if (!email || email === "" || !emailValidator.test(email))
    newErrors.email = "Enter Valid Email";
  if (!mobile || mobile === "") newErrors.mobile = "Enter Mobile Number";
  if (!city || city === "") newErrors.city = "Enter City";
  // if (!pan || pan === "") newErrors.pan = "Enter PAN";
  // if (!aadhar || aadhar === "") newErrors.aadhar = "Enter Aadhar";
  if (!state || state === "") newErrors.state = "Enter State";
  // if (!pin || pin === "") newErrors.pin = "Enter PIN Code";
  if (!country || country === "") newErrors.country = "Choose Country";
  if (!dob || dob === "") newErrors.dob = "Select DOB";
  else {
    dob1 = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - dob1.getFullYear();
    if (age < 18) newErrors.dob = "Minimum Age 18 Years";
  }

  if (!gender || gender === "") newErrors.gender = "Select Gender";
  //if (email && !(email.includes("@") && email.includes(".")))
  // newErrors.email = "Enter valid email";

  if (mobile && mobile.length !== 10)
    newErrors.mobile = "mobile number should 10 digits";

  if (pan && pan.length !== 10) newErrors.pan = "PAN number should 10 digits";

  if (aadhar && aadhar.length !== 12)
    newErrors.aadhar = "Aadhar should be 12 digits";

  return newErrors;
};

export { validateForm };
