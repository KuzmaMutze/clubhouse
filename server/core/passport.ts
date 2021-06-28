import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../../models';
import { createJwtToken } from '../utils/createJWTToken';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

passport.use(
  'jwt',
  new JwtStrategy(opts, function (jwt_payload, done) {
    done(null, jwt_payload);
  }),
);

passport.use(
  'github',
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3001/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        let userData;
        const obj = {
          fullname: profile.displayName,
          avatarUrl: profile.photos?.[0].value,
          isActive: 0,
          username: profile.username,
          phone: '',
        };

        obj.token = createJwtToken(obj);

        const findUser = await User.findOne({
          where: {
            username: obj.username,
          },
        });

        if (!findUser) {
          const user = await User.create(obj);
          console.log(user);
          userData = user.toJSON();
          // cb(null, user.toJSON());
        } else {
          userData = await findUser.toJSON();
        }

        cb(null, {
          ...userData,
          token: createJwtToken(userData),
        });
      } catch (error) {
        cb(error);
        console.log(error);
      }
    },
  ),
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.serializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    err ? done(err) : done(null, user);
  });
});

export { passport };
