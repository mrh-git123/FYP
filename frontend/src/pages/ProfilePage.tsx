import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '../api/client';
import type { Address } from '../types';
import { useAuth } from '../context/AuthContext';
import SectionHeading from '../components/SectionHeading';

type ProfileForm = {
  name: string;
  phone?: string;
  address: Address;
};

const ProfilePage = () => {
  const { user, refreshProfile } = useAuth();
  const form = useForm<ProfileForm>({
    defaultValues: {
      name: user?.name ?? '',
      phone: user?.phone ?? '',
      address: user?.address ?? {},
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({ name: user.name, phone: user.phone, address: user.address ?? {} });
    }
  }, [user, form]);

  const onSubmit = form.handleSubmit(async (values) => {
    await api.put('/auth/profile', {
      name: values.name,
      phone: values.phone,
      address: values.address,
    });
    await refreshProfile();
  });

  if (!user) {
    return null;
  }

  return (
    <main className="page profile-page">
      <div className="profile-container">
        <SectionHeading
          eyebrow="Profile"
          title="My Account"
          description="Manage your profile information and shipping details."
        />
        
        <div className="profile-layout">
          {/* Left Column: Profile Summary */}
          <aside className="profile-sidebar">
            <div className="profile-card user-info">
              <div className="avatar-placeholder">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h3>{user.name}</h3>
              <p className="email">{user.email}</p>
              <div className="info-list">
                <div className="info-item">
                  <span className="label">Phone</span>
                  <span className="value">{user.phone || 'Not set'}</span>
                </div>
                <div className="info-item">
                  <span className="label">Location</span>
                  <span className="value">
                    {user.address?.city ? `${user.address.city}, ${user.address.country}` : 'Not set'}
                  </span>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Column: Edit Form */}
          <div className="profile-content">
            <div className="profile-card">
              <div className="card-header">
                <h3>Edit Profile</h3>
              </div>
              <form onSubmit={onSubmit} className="profile-form-grid">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" {...form.register('name')} className="form-input" placeholder="Full Name" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={user.email} readOnly disabled className="form-input disabled" />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" {...form.register('phone')} className="form-input" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="form-group">
                  <label>Address Line 1</label>
                  <input type="text" {...form.register('address.line1')} className="form-input" placeholder="Street address" />
                </div>

                <div className="form-group full-width">
                  <label>Address Line 2</label>
                  <input type="text" {...form.register('address.line2')} className="form-input" placeholder="Apartment, suite, etc. (optional)" />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input type="text" {...form.register('address.city')} className="form-input" placeholder="City" />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input type="text" {...form.register('address.state')} className="form-input" placeholder="State/Province" />
                </div>
                <div className="form-group">
                  <label>Postal Code</label>
                  <input type="text" {...form.register('address.postalCode')} className="form-input" placeholder="ZIP/Postal Code" />
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <input type="text" {...form.register('address.country')} className="form-input" placeholder="Country" />
                </div>
                
                <div className="form-actions full-width">
                  <button type="submit" className="btn btn-primary btn-save">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
