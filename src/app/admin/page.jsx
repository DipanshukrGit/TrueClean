"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submissions, setSubmissions] = useState({
    contacts: [],
    bookings: [],
    totalContacts: 0,
    totalBookings: 0,
    orderStats: {
      total: 0,
      pending: 0,
      active: 0,
      completed: 0,
      cancelled: 0,
    },
  });
  const [activeTab, setActiveTab] = useState("orders");
  const [updatingOrder, setUpdatingOrder] = useState(null);

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin_token');
    }
    return null;
  };

  const setToken = (token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_token', token);
    }
  };

  const removeToken = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
    }
  };

  const checkAuth = async () => {
    try {
      const token = getToken();
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/admin/login", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setIsAuthenticated(data.authenticated);
    } catch (error) {
      setIsAuthenticated(false);
      removeToken();
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoggingIn(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        setToken(data.token);
        setIsAuthenticated(true);
        fetchSubmissions();
      } else {
        setError(data.error || "Invalid credentials");
        console.error("Login error:", data);
      }
    } catch (error) {
      console.error("Login request failed:", error);
      setError("Login failed. Please check your connection and try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    removeToken();
    setIsAuthenticated(false);
    setSubmissions({ 
      contacts: [], 
      bookings: [], 
      totalContacts: 0, 
      totalBookings: 0,
      orderStats: {
        total: 0,
        pending: 0,
        active: 0,
        completed: 0,
        cancelled: 0,
      },
    });
    router.push('/');
  };

  const fetchSubmissions = async () => {
    try {
      const token = getToken();
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      const response = await fetch("/api/admin/submissions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
      } else if (response.status === 401) {
        removeToken();
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      setUpdatingOrder(orderId);
      const token = getToken();
      if (!token) {
        alert("Authentication required");
        return;
      }

      const response = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderId, status }),
      });

      const data = await response.json();

      if (response.ok) {
        // Refresh submissions to get updated data
        await fetchSubmissions();
      } else {
        alert(data.error || "Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status");
    } finally {
      setUpdatingOrder(null);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions();
      // Refresh submissions every 30 seconds
      const interval = setInterval(fetchSubmissions, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      confirmed: "bg-blue-100 text-blue-800 border-blue-200",
      completed: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    };

    const defaultStatus = status || "pending";
    const style = statusStyles[defaultStatus] || statusStyles.pending;
    const label = defaultStatus.charAt(0).toUpperCase() + defaultStatus.slice(1);

    return (
      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${style}`}>
        {label}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-[var(--foreground)] font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
        <div className="max-w-md w-full bg-[var(--card-surface)] rounded-2xl shadow-2xl p-8 border border-[var(--border)]">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Admin Login</h1>
            <p className="text-[var(--muted-foreground)]">Enter your credentials to access the admin panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-[var(--border)] rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-[var(--card-surface)] text-[var(--foreground)]"
                placeholder="admin@trueclean.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-[var(--border)] rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-[var(--card-surface)] text-[var(--foreground)]"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-[1.02]"
            >
              {isLoggingIn ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[var(--muted-foreground)] bg-[var(--surface-alt)] rounded-lg p-4">
            <p className="font-semibold mb-1">Default credentials:</p>
            <p className="font-mono text-xs">Email: admin@trueclean.com</p>
            <p className="font-mono text-xs">Password: admin123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="bg-[var(--card-surface)] shadow-lg border-b border-[var(--border)] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">
                Manage orders and customer inquiries
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-md hover:shadow-lg font-semibold flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Order Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {/* Total Orders */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <p className="text-blue-100 text-sm font-medium mb-1">Total Orders</p>
            <p className="text-4xl font-bold">{submissions.orderStats?.total || 0}</p>
          </div>

          {/* Pending Orders */}
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-yellow-100 text-sm font-medium mb-1">Pending</p>
            <p className="text-4xl font-bold">{submissions.orderStats?.pending || 0}</p>
          </div>

          {/* Active Orders */}
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <p className="text-indigo-100 text-sm font-medium mb-1">Active</p>
            <p className="text-4xl font-bold">{submissions.orderStats?.active || 0}</p>
          </div>

          {/* Completed Orders */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-green-100 text-sm font-medium mb-1">Completed</p>
            <p className="text-4xl font-bold">{submissions.orderStats?.completed || 0}</p>
          </div>

          {/* Cancelled Orders */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <p className="text-red-100 text-sm font-medium mb-1">Cancelled</p>
            <p className="text-4xl font-bold">{submissions.orderStats?.cancelled || 0}</p>
          </div>
        </div>

        {/* Contact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[var(--card-surface)] rounded-2xl shadow-lg p-6 border border-[var(--border)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[var(--muted-foreground)] mb-1">Total Contacts</p>
                <p className="text-3xl font-bold text-primary">
                  {submissions.totalContacts}
                </p>
              </div>
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-[var(--card-surface)] rounded-2xl shadow-lg p-6 border border-[var(--border)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[var(--muted-foreground)] mb-1">Total Bookings</p>
                <p className="text-3xl font-bold text-secondary">
                  {submissions.totalBookings}
                </p>
              </div>
              <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-[var(--card-surface)] rounded-2xl shadow-lg border border-[var(--border)] overflow-hidden">
          <div className="border-b border-[var(--border)] bg-[var(--surface-alt)]">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("orders")}
                className={`px-8 py-4 text-sm font-semibold border-b-3 transition-all ${
                  activeTab === "orders"
                    ? "border-primary text-primary bg-[var(--card-surface)]"
                    : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
                }`}
              >
                Clean Orders ({submissions.totalBookings})
              </button>
              <button
                onClick={() => setActiveTab("contacts")}
                className={`px-8 py-4 text-sm font-semibold border-b-3 transition-all ${
                  activeTab === "contacts"
                    ? "border-primary text-primary bg-[var(--card-surface)]"
                    : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
                }`}
              >
                Contact Forms ({submissions.totalContacts})
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === "orders" && (
              <div className="space-y-4">
                {submissions.bookings.length === 0 ? (
                  <div className="text-center py-16 text-[var(--muted-foreground)]">
                    <svg className="w-16 h-16 mx-auto mb-4 text-[var(--border)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="text-lg font-medium">No booking requests yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-[var(--border)]">
                      <thead className="bg-gradient-to-r from-[var(--surface-alt)] to-[var(--surface)]">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                            Customer
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                            Contact
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                            Location
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                            Services
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-[var(--card-surface)] divide-y divide-[var(--border)]">
                        {submissions.bookings.map((booking) => (
                          <tr key={booking._id} className="hover:bg-[var(--surface-alt)] transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--muted-foreground)]">
                              {new Date(booking.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-semibold text-[var(--foreground)]">{booking.customer_name}</div>
                              <div className="text-sm text-[var(--muted-foreground)]">{booking.customer_email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--muted-foreground)]">
                              {booking.customer_phone}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--muted-foreground)]">
                              {booking.customer_city && booking.customer_state
                                ? `${booking.customer_city}, ${booking.customer_state}`
                                : booking.customer_city || booking.customer_state || "-"}
                              {booking.customer_date && (
                                <div className="text-xs text-[var(--border)] mt-1">
                                  Date: {booking.customer_date}
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm text-[var(--muted-foreground)] max-w-xs">
                              {booking.selected_services &&
                              Object.keys(booking.selected_services).length > 0
                                ? Object.entries(booking.selected_services)
                                    .filter(([_, service]) => service.selected && service.quantity > 0)
                                    .map(([key, service]) => (
                                      <div key={key} className="mb-1 text-xs">
                                        <span className="font-medium">{key.replace(/([A-Z])/g, " $1").trim()}:</span> {service.quantity} {service.unit}
                                      </div>
                                    ))
                                : "-"}
                              {booking.other_service && (
                                <div className="text-xs text-[var(--border)] mt-1 italic">
                                  Other: {booking.other_service}
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getStatusBadge(booking.status)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex items-center gap-2">
                                {booking.status !== 'confirmed' && booking.status !== 'completed' && booking.status !== 'cancelled' && (
                                  <button
                                    onClick={() => updateOrderStatus(booking._id, 'confirmed')}
                                    disabled={updatingOrder === booking._id}
                                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                                  >
                                    {updatingOrder === booking._id ? '...' : 'Confirm'}
                                  </button>
                                )}
                                {booking.status === 'confirmed' && (
                                  <button
                                    onClick={() => updateOrderStatus(booking._id, 'completed')}
                                    disabled={updatingOrder === booking._id}
                                    className="px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                                  >
                                    {updatingOrder === booking._id ? '...' : 'Complete'}
                                  </button>
                                )}
                                {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                                  <button
                                    onClick={() => {
                                      if (confirm('Are you sure you want to cancel this order?')) {
                                        updateOrderStatus(booking._id, 'cancelled');
                                      }
                                    }}
                                    disabled={updatingOrder === booking._id}
                                    className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                                  >
                                    {updatingOrder === booking._id ? '...' : 'Cancel'}
                                  </button>
                                )}
                                {(booking.status === 'pending' || booking.status === 'confirmed') && (
                                  <button
                                    onClick={() => updateOrderStatus(booking._id, 'pending')}
                                    disabled={updatingOrder === booking._id}
                                    className="px-3 py-1.5 bg-yellow-600 text-white text-xs font-semibold rounded-lg hover:bg-yellow-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                                  >
                                    {updatingOrder === booking._id ? '...' : 'Reset'}
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === "contacts" && (
              <div className="space-y-4">
                {submissions.contacts.length === 0 ? (
                  <div className="text-center py-16 text-[var(--muted-foreground)]">
                    <svg className="w-16 h-16 mx-auto mb-4 text-[var(--border)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className="text-lg font-medium">No contact form submissions yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-[var(--border)]">
                      <thead className="bg-gradient-to-r from-[var(--surface-alt)] to-[var(--surface)]">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                            Phone
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                            Service
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                            Message
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-[var(--card-surface)] divide-y divide-[var(--border)]">
                        {submissions.contacts.map((contact) => (
                          <tr key={contact._id} className="hover:bg-[var(--surface-alt)] transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--muted-foreground)]">
                              {new Date(contact.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[var(--foreground)]">
                              {contact.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--muted-foreground)]">
                              {contact.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--muted-foreground)]">
                              {contact.phone}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--muted-foreground)]">
                              {contact.service || "-"}
                            </td>
                            <td className="px-6 py-4 text-sm text-[var(--muted-foreground)] max-w-xs">
                              {contact.message || "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
