import React from 'react'
import { Container } from '../components'
import UserSettingsForm from '../components/forms/UserSettingsForm'

function UserSettings() {
  return (
    <div className='py-8'>
        <Container>
            <UserSettingsForm />
        </Container>
    </div>
  )
}

export default UserSettings