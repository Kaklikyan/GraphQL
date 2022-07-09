import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Button, Table, Modal, Header, Input, Icon, Dropdown } from 'semantic-ui-react';
import { ALL_USERS } from '../apollo/users';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { COUNTRY_OPTIONS, POSITION } from '../apollo/constant';
import moment from 'moment/moment';
import '../index.css'

const User = ({ onDelete, onCreate, onEdit, addTodo, error, id, setId }) => {
  const { data } = useQuery(ALL_USERS);
  const [name, setName] = useState('');
  const [activeUser, setActiveUser] = useState({});
  const [birthDate, setBirthDate] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [position, setPosition] = useState();
  const [comments, setComments] = useState();
  const [open, setOpen] = useState(false)
  const [showError, setShowError] = useState(false);

  const handleAddUsers = () => {
    if (name.length) {
      onCreate({
        variables: {
          name,
          birthDate,
          country,
          city,
          position,
          comments
        },
      });
      setName('');
    }
  }

  const handleEditUsers = () => {
    onEdit({
      variables: {
        id,
        ...(name && {
          name: name
        }),
        ...(birthDate && {
          birthDate: birthDate
        }),
        ...(country && {
          country: country
        }),
        ...(city && {
          city: city
        }),
        ...(position && {
          position: position
        }),
        ...(comments && {
          comments: comments
        })
      }
    });
    setName('');
  }
  useEffect(() => {
    error ? setShowError(true) : setShowError(false)
  }, [error])
  return (
    <> {showError &&
      <div class='errorWrapper'>
        {error.message}
        <Button
          className='errorCloseButton'
          icon='close'
          onClick={() => setShowError(false)}
        />
      </div>}
      <Modal
        closeIcon
        open={open}
        trigger={
          <div class='addButtonWrapper'>
            <Button onClick={() => setActiveUser(null)} class='addBtn'>Add User</Button>
          </div>}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Header icon='user' content='Add new user' />
        <Modal.Content>
          <div class='formWrapper'>
            <div class='formFirstRow'>
              <div class='fieldWrapper'>
                <label class='label'>Name</label>
                <Input
                  value={name || activeUser?.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div class='fieldWrapper'>
                <label class='label'>Birth Date</label>
                <DatePicker
                  selected={birthDate || (activeUser?.birthDate && moment(activeUser?.birthDate).toDate())}
                  onChange={(date) => setBirthDate(date)}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div class='fieldWrapper'>
                <label class='label'>Country</label>
                <Dropdown
                  search
                  placeholder='Country'
                  className='countrySelector'
                  value={country || activeUser?.country}
                  scrolling
                  options={COUNTRY_OPTIONS}
                  onChange={({ target }, { value: key }) => {
                    setCountry(key)
                  }}
                />
              </div>
            </div>
            <div class='formSecondRow'>
              <div class='fieldWrapper'>
                <label class='label'>City</label>
                <Input
                  value={city || activeUser?.city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div class='fieldWrapper'>
                <label class='label'>Position</label>
                <Dropdown
                  placeholder='Position'
                  class='countrySelector'
                  scrolling
                  value={position || activeUser?.position}
                  options={POSITION}
                  onChange={({ target }, { value: key }) => {
                    setPosition(key)
                  }}
                />
              </div>
              <div class='fieldWrapper'>
                <label class='label'>Comment</label>
                <Input
                  value={comments || activeUser?.comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={() => (
            setName(),
            setBirthDate(),
            setCountry(),
            setCity(),
            setPosition(),
            setComments(),
            setOpen(false)
          )}>
            <Icon name='remove' /> Cancel
          </Button>
          {
            !activeUser ?

              <Button color='green' onClick={() => {
                return (
                  handleAddUsers(),
                  setName(),
                  setBirthDate(),
                  setCountry(),
                  setCity(),
                  setPosition(),
                  setComments(),
                  setOpen(false)
                )
              }}>
                <Icon name='save' /> Save
              </Button>
              : <Button color='green' onClick={() => {
                return (
                  handleEditUsers(),
                  setName(),
                  setBirthDate(),
                  setCountry(),
                  setCity(),
                  setPosition(),
                  setComments(),
                  setOpen(false)
                )
              }}>
                <Icon name='save' /> Edit
              </Button>
          }

        </Modal.Actions>
      </Modal >

      <Table >
        <Table.Header>
          <Table.HeaderCell>
            Name
          </Table.HeaderCell>
          <Table.HeaderCell>
            Birth Date
          </Table.HeaderCell>
          <Table.HeaderCell>
            Country
          </Table.HeaderCell>
          <Table.HeaderCell>
            City
          </Table.HeaderCell>
          <Table.HeaderCell>
            Position
          </Table.HeaderCell>
          <Table.HeaderCell>
            Comments
          </Table.HeaderCell>
          <Table.HeaderCell>
            ID
          </Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Header>
        {data.users.map(({ id, name, birthDate, country, city, position, comments }) => (
          <Table.Body>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{moment(birthDate).format("DD/MM/YYYY") || birthDate}</Table.Cell>
            <Table.Cell>{country}</Table.Cell>
            <Table.Cell>{city}</Table.Cell>
            <Table.Cell>{position}</Table.Cell>
            <Table.Cell>{comments}</Table.Cell>
            <Table.Cell>{id}</Table.Cell>
            <Table.Cell>
              <Button
                className='deleteButton'
                icon='trash alternates'
                onClick={() => onDelete({
                  variables: { id }
                })}
              />
              <Button

                className='editButtom'
                icon='edit'
                onClick={() => (
                  setId(id),
                  setOpen(true),
                  setActiveUser(data.users.find(item => item.id === id))
                )}
              />
            </Table.Cell>
          </Table.Body>
        ))}
      </Table>
    </>
  );
};

export default User;