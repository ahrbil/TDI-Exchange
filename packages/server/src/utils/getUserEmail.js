const getUserEmail = profile => {
  const email =
    profile.emails && profile.emails.length > 0 && profile.emails[0].value
      ? profile.emails[0].value
      : null;
  return email;
};

export default getUserEmail;
