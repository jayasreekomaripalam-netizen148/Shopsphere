import { useEffect, useState } from "react";
import {
  User, Mail, Phone, MapPin, Edit3, Save, X,
  Plus, Trash2, Package, Heart, Settings, ShieldCheck
} from "lucide-react";
import "./Profile.css";

const defaultProfile = {
  name: "ShopSphere Customer",
  email: "customer@example.com",
  phone: "",
  gender: "Prefer not to say",
  birthday: "",
};

const defaultAddresses = [];

export default function Profile() {
  const [profile, setProfile] = useState(defaultProfile);
  const [addresses, setAddresses] = useState(defaultAddresses);
  const [editing, setEditing] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    type: "Home",
  });

  useEffect(() => {
    try {
      const savedProfile = JSON.parse(
        localStorage.getItem("shopsphere-user-profile")
      );
      const savedAddresses = JSON.parse(
        localStorage.getItem("shopsphere-user-addresses")
      );

      if (savedProfile) setProfile({ ...defaultProfile, ...savedProfile });
      if (Array.isArray(savedAddresses)) setAddresses(savedAddresses);
    } catch {
      // Use default values if saved browser data is invalid.
    }
  }, []);

  const saveProfile = () => {
    localStorage.setItem("shopsphere-user-profile", JSON.stringify(profile));
    setEditing(false);
    alert("Profile updated successfully!");
  };

  const updateProfile = (field, value) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const updateAddressField = (field, value) => {
    setAddressForm((current) => ({ ...current, [field]: value }));
  };

  const saveAddress = (event) => {
    event.preventDefault();

    const updated = [
      ...addresses,
      { ...addressForm, id: Date.now() },
    ];

    setAddresses(updated);
    localStorage.setItem("shopsphere-user-addresses", JSON.stringify(updated));
    setAddressForm({
      name: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      type: "Home",
    });
    setShowAddressForm(false);
  };

  const deleteAddress = (id) => {
    const updated = addresses.filter((address) => address.id !== id);
    setAddresses(updated);
    localStorage.setItem("shopsphere-user-addresses", JSON.stringify(updated));
  };

  return (
    <main className="profile-page">
      <div className="profile-heading">
        <div>
          <span className="profile-eyebrow">MY ACCOUNT</span>
          <h1>My Profile</h1>
          <p>Manage your personal information and delivery addresses.</p>
        </div>
        <div className="profile-heading-icon">
          <User size={30} />
        </div>
      </div>

      <div className="profile-layout">
        <aside className="profile-sidebar">
          <div className="profile-avatar">
            {profile.name.trim().charAt(0).toUpperCase() || "U"}
          </div>
          <h2>{profile.name}</h2>
          <p>{profile.email}</p>

          <div className="profile-menu">
            <a className="active" href="#personal">
              <User size={18} /> Personal Information
            </a>
            <a href="#addresses">
              <MapPin size={18} /> Manage Addresses
            </a>
            <a href="/orders">
              <Package size={18} /> My Orders
            </a>
            <a href="/wishlist">
              <Heart size={18} /> My Wishlist
            </a>
            <a href="#settings">
              <Settings size={18} /> Account Settings
            </a>
          </div>

          <div className="profile-security">
            <ShieldCheck size={20} />
            <div>
              <strong>Your information</strong>
              <span>Stored locally in this browser demo.</span>
            </div>
          </div>
        </aside>

        <section className="profile-content">
          <div className="profile-card" id="personal">
            <div className="profile-card-heading">
              <div>
                <h2>Personal Information</h2>
                <p>Update your personal details.</p>
              </div>

              {!editing ? (
                <button
                  className="profile-edit-button"
                  onClick={() => setEditing(true)}
                >
                  <Edit3 size={16} /> Edit
                </button>
              ) : (
                <div className="profile-actions">
                  <button
                    className="profile-cancel-button"
                    onClick={() => {
                      const saved = JSON.parse(
                        localStorage.getItem("shopsphere-user-profile")
                      );
                      setProfile({ ...defaultProfile, ...(saved || {}) });
                      setEditing(false);
                    }}
                  >
                    <X size={16} /> Cancel
                  </button>
                  <button className="profile-save-button" onClick={saveProfile}>
                    <Save size={16} /> Save
                  </button>
                </div>
              )}
            </div>

            <div className="profile-form-grid">
              <label>
                Full Name
                <span className="profile-input-wrap">
                  <User size={17} />
                  <input
                    value={profile.name}
                    disabled={!editing}
                    onChange={(e) => updateProfile("name", e.target.value)}
                    placeholder="Enter your full name"
                  />
                </span>
              </label>

              <label>
                Email Address
                <span className="profile-input-wrap">
                  <Mail size={17} />
                  <input
                    type="email"
                    value={profile.email}
                    disabled={!editing}
                    onChange={(e) => updateProfile("email", e.target.value)}
                    placeholder="Enter your email"
                  />
                </span>
              </label>

              <label>
                Mobile Number
                <span className="profile-input-wrap">
                  <Phone size={17} />
                  <input
                    value={profile.phone}
                    disabled={!editing}
                    onChange={(e) => updateProfile("phone", e.target.value)}
                    placeholder="Enter your mobile number"
                  />
                </span>
              </label>

              <label>
                Gender
                <select
                  value={profile.gender}
                  disabled={!editing}
                  onChange={(e) => updateProfile("gender", e.target.value)}
                >
                  <option>Prefer not to say</option>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </select>
              </label>

              <label>
                Date of Birth
                <input
                  type="date"
                  value={profile.birthday}
                  disabled={!editing}
                  onChange={(e) => updateProfile("birthday", e.target.value)}
                />
              </label>
            </div>
          </div>

          <div className="profile-card" id="addresses">
            <div className="profile-card-heading">
              <div>
                <h2>Manage Addresses</h2>
                <p>Your saved delivery locations.</p>
              </div>
              <button
                className="profile-edit-button"
                onClick={() => setShowAddressForm((value) => !value)}
              >
                <Plus size={17} /> Add Address
              </button>
            </div>

            {showAddressForm && (
              <form className="address-form" onSubmit={saveAddress}>
                <div className="profile-form-grid">
                  <label>
                    Recipient Name
                    <input
                      required
                      value={addressForm.name}
                      onChange={(e) => updateAddressField("name", e.target.value)}
                    />
                  </label>
                  <label>
                    Phone Number
                    <input
                      required
                      type="tel"
                      value={addressForm.phone}
                      onChange={(e) => updateAddressField("phone", e.target.value)}
                    />
                  </label>
                  <label className="address-full">
                    Street Address
                    <input
                      required
                      value={addressForm.street}
                      onChange={(e) => updateAddressField("street", e.target.value)}
                    />
                  </label>
                  <label>
                    City
                    <input
                      required
                      value={addressForm.city}
                      onChange={(e) => updateAddressField("city", e.target.value)}
                    />
                  </label>
                  <label>
                    State
                    <input
                      required
                      value={addressForm.state}
                      onChange={(e) => updateAddressField("state", e.target.value)}
                    />
                  </label>
                  <label>
                    PIN Code
                    <input
                      required
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      value={addressForm.pincode}
                      onChange={(e) => updateAddressField("pincode", e.target.value)}
                    />
                  </label>
                  <label>
                    Address Type
                    <select
                      value={addressForm.type}
                      onChange={(e) => updateAddressField("type", e.target.value)}
                    >
                      <option>Home</option>
                      <option>Work</option>
                      <option>Other</option>
                    </select>
                  </label>
                </div>
                <div className="address-form-actions">
                  <button type="button" className="profile-cancel-button"
                    onClick={() => setShowAddressForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="profile-save-button">
                    Save Address
                  </button>
                </div>
              </form>
            )}

            {addresses.length === 0 && !showAddressForm ? (
              <div className="empty-addresses">
                <MapPin size={32} />
                <strong>No saved addresses yet</strong>
                <span>Add an address to make checkout easier.</span>
              </div>
            ) : (
              <div className="address-list">
                {addresses.map((address) => (
                  <article className="address-item" key={address.id}>
                    <div className="address-item-icon">
                      <MapPin size={20} />
                    </div>
                    <div className="address-item-details">
                      <div className="address-label-row">
                        <strong>{address.name}</strong>
                        <span>{address.type}</span>
                      </div>
                      <p>{address.street}, {address.city}, {address.state} - {address.pincode}</p>
                      <small>{address.phone}</small>
                    </div>
                    <button
                      className="address-delete"
                      onClick={() => deleteAddress(address.id)}
                      aria-label="Delete address"
                    >
                      <Trash2 size={18} />
                    </button>
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="profile-card profile-settings-card" id="settings">
            <h2>Account Settings</h2>
            <p>More account security and notification controls will be available when the backend is connected.</p>
            <div className="settings-note">
              <ShieldCheck size={20} />
              <span>Authentication and secure account management will be implemented with the ShopSphere backend.</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

