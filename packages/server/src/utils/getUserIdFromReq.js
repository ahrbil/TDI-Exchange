import { session } from "../middlewares";

const getUserIdFromReq = req =>
  new Promise((resolve, reject) => {
    session(req, {}, error => {
      if (error) {
        return reject(error);
      }
      if (!req.session || !req.session.passport || !req.session.passport.user) {
        return resolve(null);
      }
      return resolve(req.session.passport.user);
    });
  });

export default getUserIdFromReq;
