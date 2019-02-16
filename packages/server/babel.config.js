module.exports = api => {
  const IS_PROD = api.env("production");
  return {
    presets: ["@babel/preset-env"],
    plugins: IS_PROD ? [] : ["inline-dotenv"]
  };
};
