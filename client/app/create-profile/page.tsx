'use client';

import React, { useState } from 'react';
import ProfileForm from '@/app/components/profile-form';
import '@/app/styles/create-profile.css';
import RootLayout from '../layout';
import DashboardLayout from '../dashboard-layout';

export default function CreateProfile() {
  const [editProfile, setEditProfile] = useState(false);
  return (
    <RootLayout>
      <DashboardLayout>
        <main className="dashboard">
          <div>
            <div className="profile_div">
              <div className="profile_form">
                <ProfileForm
                  editProfile={editProfile}
                  setEditProfile={setEditProfile}
                />
              </div>
            </div>
          </div>
        </main>
      </DashboardLayout>
    </RootLayout>
  );
}
