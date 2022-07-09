import { useQuery, useMutation } from '@apollo/client'

import { ALL_USERS, DELETE_USER, ADD_USERS, UPDATE_USERS } from '../apollo/users';
import User from './User';
import TotalCount from './TotalCount';
import { Loader } from 'semantic-ui-react';
import { useState } from 'react';

const UsersList = () => {
  const { loading, data, error } = useQuery(ALL_USERS);
  const [id, setId] = useState('');

  const [updateUser] = useMutation(UPDATE_USERS);
  const [removeUser] = useMutation(DELETE_USER, {
    update(cache, { data: { removeUser } }) {
      cache.modify({
        fields: {
          allUsers(currentTodos = []) {

            return currentTodos.filter(todo => todo.__ref !== `User:${removeUser.id}`)
          }
        }
      })
    }
  });

  const [createUser] = useMutation(ADD_USERS, {
    update(cache, { data: { newUsers } }) {
      const { users } = cache.readQuery({ query: ALL_USERS });
      cache.writeQuery({
        query: ALL_USERS,
        data: {
          users: [newUsers, ...users]
        }
      })
    }
  });


  if (loading) {
    return <Loader />
  }

  return (
    <>
      <User
        error={error}
        id={id}
        setId={setId}
        onCreate={createUser}
        onDelete={removeUser}
        onEdit={updateUser}
      />
      <TotalCount data={data} />
    </>
  );
};

export default UsersList;
