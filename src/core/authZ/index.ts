import { AuthChecker } from 'type-graphql';
import { Context } from '../../config';
import {
  initOso,
  User,
  Role,
  Lesson
} from '@outside-interactive/gql-utils.authz.knowledge-base';

const customAuthZ: AuthChecker<Context> = async ({ args, context }) => {
  const oso = await initOso();

  let userRoles: Role[] = [{ name: 'guest', postType: 'public' }];

  if (context?.user?.roles?.length) {
    // * Create the roles. Right now, all roles can see the postType of 'private.'
    userRoles = [
      ...context.user.roles.map((role: string) => {
        return { name: role, postType: 'private' };
      })
    ];
  }

  // * Create a new Oso User using the id and roles from the token passed via context
  const newUser = new User({
    id: context?.user?.sub || '',
    roles: userRoles
  });

  // * Createa  new OSO Lesson which is private because all Lessons are private at this point
  const resource = new Lesson({ type: 'private', id: args.id });
  // * Try to authorize the user and it's roles using the Lesson
  try {
    await oso.authorize(newUser, 'allow', resource);
    return true;
  } catch (e) {
    console.log('ERROR: ', e);
    return false;
  }
};

export default customAuthZ;
