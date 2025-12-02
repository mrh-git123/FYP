import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import adminApi from '../api/client';
import type { AdminUser } from '../types';

const UsersPage = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data: response } = await adminApi.get<AdminUser[]>('/admin/users');
      return response;
    },
  });

  const updateRole = useMutation({
    mutationFn: ({ id, role }: { id: string; role: AdminUser['role'] }) => adminApi.patch(`/admin/users/${id}/role`, { role }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  const deleteUser = useMutation({
    mutationFn: (id: string) => adminApi.delete(`/admin/users/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  if (isLoading) {
    return (
      <div className="page-center">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Customers</p>
          <h3>Account directory</h3>
        </div>
      </div>
      <div className="data-table users-table">
        <div className="table-head">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Actions</span>
        </div>
        {data?.map((user: AdminUser) => (
          <div key={user._id} className="table-row">
            <span>{user.name}</span>
            <span>{user.email}</span>
            <select value={user.role} onChange={(event) => updateRole.mutate({ id: user._id, role: event.currentTarget.value as AdminUser['role'] })}>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
            <button type="button" className="btn-icon" onClick={() => deleteUser.mutate(user._id)}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UsersPage;
